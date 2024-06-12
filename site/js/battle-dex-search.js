/**
 * Search
 *
 * Code for searching for dex information, used by the Dex and
 * Teambuilder.
 *
 * Dependencies: battledata, search-index
 * Optional dependencies: pokedex, moves, items, abilities
 *
 * @author Guangcong Luo <guangcongluo@gmail.com>
 * @license MIT
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * Backend for search UIs.
 */
var DexSearch = /** @class */ (function () {
    function DexSearch(searchType, formatid, species) {
        if (searchType === void 0) { searchType = ''; }
        if (formatid === void 0) { formatid = ''; }
        if (species === void 0) { species = ''; }
        this.query = '';
        /**
         * Dex for the mod/generation to search.
         */
        this.dex = Dex;
        this.typedSearch = null;
        this.results = null;
        this.exactMatch = false;
        this.firstPokemonColumn = 'Number';
        /**
         * Column to sort by. Default is `null`, a smart sort determined by how good
         * things are according to the base filters, falling back to dex number (for
         * Pokemon) and name (for everything else).
         */
        this.sortCol = null;
        this.reverseSort = false;
        /**
         * Filters for the search result. Does not include the two base filters
         * (format and species).
         */
        this.filters = null;
        this.setType(searchType, formatid, species);
    }
    DexSearch.prototype.getTypedSearch = function (searchType, format, speciesOrSet) {
        if (format === void 0) { format = ''; }
        if (speciesOrSet === void 0) { speciesOrSet = ''; }
        if (!searchType)
            return null;
        switch (searchType) {
            case 'pokemon': return new BattlePokemonSearch('pokemon', format, speciesOrSet);
            case 'item': return new BattleItemSearch('item', format, speciesOrSet);
            case 'move': return new BattleMoveSearch('move', format, speciesOrSet);
            case 'ability': return new BattleAbilitySearch('ability', format, speciesOrSet);
            case 'type': return new BattleTypeSearch('type', format, speciesOrSet);
            case 'category': return new BattleCategorySearch('category', format, speciesOrSet);
            case 'location': return new BattleLocationSearch('location', format, speciesOrSet);
        }
        return null;
    };
    DexSearch.prototype.find = function (query) {
        var _a;
        query = toID(query);
        if (this.query === query && this.results) {
            return false;
        }
        this.query = query;
        if (!query) {
            this.results = ((_a = this.typedSearch) === null || _a === void 0 ? void 0 : _a.getResults(this.filters, this.sortCol, this.reverseSort)) || [];
        }
        else {
            this.results = this.textSearch(query);
        }
        return true;
    };
    DexSearch.prototype.setType = function (searchType, format, speciesOrSet) {
        var _a;
        if (format === void 0) { format = ''; }
        if (speciesOrSet === void 0) { speciesOrSet = ''; }
        // invalidate caches
        this.results = null;
        if (searchType !== ((_a = this.typedSearch) === null || _a === void 0 ? void 0 : _a.searchType)) {
            this.filters = null;
            this.sortCol = null;
        }
        this.typedSearch = this.getTypedSearch(searchType, format, speciesOrSet);
        if (this.typedSearch)
            this.dex = this.typedSearch.dex;
    };
    DexSearch.prototype.addFilter = function (entry) {
        if (!this.typedSearch)
            return false;
        var type = entry[0];
        if (this.typedSearch.searchType === 'pokemon') {
            if (type === this.sortCol)
                this.sortCol = null;
            if (!['type', 'move', 'ability', 'egggroup', 'tier'].includes(type))
                return false;
            if (type === 'move')
                entry[1] = toID(entry[1]);
            if (!this.filters)
                this.filters = [];
            this.results = null;
            for (var _i = 0, _a = this.filters; _i < _a.length; _i++) {
                var filter = _a[_i];
                if (filter[0] === type && filter[1] === entry[1]) {
                    return true;
                }
            }
            this.filters.push(entry);
            return true;
        }
        else if (this.typedSearch.searchType === 'move') {
            if (type === this.sortCol)
                this.sortCol = null;
            if (!['type', 'category', 'pokemon'].includes(type))
                return false;
            if (type === 'pokemon')
                entry[1] = toID(entry[1]);
            if (!this.filters)
                this.filters = [];
            this.filters.push(entry);
            this.results = null;
            return true;
        }
        else if (this.typedSearch.searchType === 'location') {
            if (type === this.sortCol)
                this.sortCol = null;
            if (!['pokemon'].includes(type))
                return false;
            if (type === 'pokemon')
                entry[1] = toID(entry[1]);
            if (!this.filters)
                this.filters = [];
            this.filters.push(entry);
            this.results = null;
            return true;
        }
        return false;
    };
    DexSearch.prototype.removeFilter = function (entry) {
        if (!this.filters)
            return false;
        if (entry) {
            var filterid = entry.join(':');
            var deleted = null;
            // delete specific filter
            for (var i = 0; i < this.filters.length; i++) {
                if (filterid === this.filters[i].join(':')) {
                    deleted = this.filters[i];
                    this.filters.splice(i, 1);
                    break;
                }
            }
            if (!deleted)
                return false;
        }
        else {
            this.filters.pop();
        }
        if (!this.filters.length)
            this.filters = null;
        this.results = null;
        return true;
    };
    DexSearch.prototype.toggleSort = function (sortCol) {
        if (this.sortCol === sortCol) {
            if (!this.reverseSort) {
                this.reverseSort = true;
            }
            else {
                this.sortCol = null;
                this.reverseSort = false;
            }
        }
        else {
            this.sortCol = sortCol;
            this.reverseSort = false;
        }
        this.results = null;
    };
    DexSearch.prototype.filterLabel = function (filterType) {
        if (this.typedSearch && this.typedSearch.searchType !== filterType) {
            return 'Filter';
        }
        return null;
    };
    DexSearch.prototype.illegalLabel = function (id) {
        var _a, _b;
        return ((_b = (_a = this.typedSearch) === null || _a === void 0 ? void 0 : _a.illegalReasons) === null || _b === void 0 ? void 0 : _b[id]) || null;
    };
    DexSearch.prototype.getTier = function (species) {
        var _a;
        return ((_a = this.typedSearch) === null || _a === void 0 ? void 0 : _a.getTier(species)) || '';
    };
    DexSearch.prototype.textSearch = function (query) {
        var _a, _b;
        query = toID(query);
        this.exactMatch = false;
        var searchType = ((_a = this.typedSearch) === null || _a === void 0 ? void 0 : _a.searchType) || '';
        // If searchType exists, we're searching mainly for results of that type.
        // We'll still search for results of other types, but those results
        // will only be used to filter results for that type.
        var searchTypeIndex = (searchType ? DexSearch.typeTable[searchType] : -1);
        /** searching for "Psychic type" will make the type come up over the move */
        var qFilterType = '';
        if (query.slice(-4) === 'type') {
            if (query.slice(0, -4) in window.BattleTypeChart) {
                query = query.slice(0, -4);
                qFilterType = 'type';
            }
        }
        // i represents the location of the search index we're looking at
        var i = DexSearch.getClosest(query);
        this.exactMatch = (BattleSearchIndex[i][0] === query);
        // Even with output buffer buckets, we make multiple passes through
        // the search index. searchPasses is a queue of which pass we're on:
        // [passType, i, query]
        // By doing an alias pass after the normal pass, we ensure that
        // mid-word matches only display after start matches.
        var passType = '';
        var searchPasses = [['normal', i, query]];
        // For performance reasons, only do an alias pass if query is at
        // least 2 chars long
        if (query.length > 1)
            searchPasses.push(['alias', i, query]);
        // If the query matches an official alias in BattleAliases: These are
        // different from the aliases in the search index and are given
        // higher priority. We'll do a normal pass through the index with
        // the alias text before any other passes.
        var queryAlias;
        if (query in BattleAliases) {
            if (['sub', 'tr'].includes(query) || toID(BattleAliases[query]).slice(0, query.length) !== query) {
                queryAlias = toID(BattleAliases[query]);
                var aliasPassType = (queryAlias === 'hiddenpower' ? 'exact' : 'normal');
                searchPasses.unshift([aliasPassType, DexSearch.getClosest(queryAlias), queryAlias]);
            }
            this.exactMatch = true;
        }
        // If there are no matches starting with query: Do a fuzzy match pass
        // Fuzzy matches will still be shown after alias matches
        if (!this.exactMatch && BattleSearchIndex[i][0].substr(0, query.length) !== query) {
            // No results start with this. Do a fuzzy match pass.
            var matchLength = query.length - 1;
            if (!i)
                i++;
            while (matchLength &&
                BattleSearchIndex[i][0].substr(0, matchLength) !== query.substr(0, matchLength) &&
                BattleSearchIndex[i - 1][0].substr(0, matchLength) !== query.substr(0, matchLength)) {
                matchLength--;
            }
            var matchQuery = query.substr(0, matchLength);
            while (i >= 1 && BattleSearchIndex[i - 1][0].substr(0, matchLength) === matchQuery)
                i--;
            searchPasses.push(['fuzzy', i, '']);
        }
        // We split the output buffers into 8 buckets.
        // Bucket 0 is usually unused, and buckets 1-7 represent
        // pokemon, types, moves, etc (see typeTable).
        // When we're done, the buffers are concatenated together to form
        // our results, with each buffer getting its own header, unlike
        // multiple-pass results, which have no header.
        // Notes:
        // - if we have a searchType, that searchType's buffer will be on top
        var bufs = [[], [], [], [], [], [], [], [], [], [], []];
        var topbufIndex = -1;
        var count = 0;
        var nearMatch = false;
        /** [type, id, typeIndex] */
        var instafilter = null;
        var instafilterSort = [0, 1, 2, 5, 4, 3, 6, 7, 8];
        var illegal = (_b = this.typedSearch) === null || _b === void 0 ? void 0 : _b.illegalReasons;
        // We aren't actually looping through the entirety of the searchIndex
        for (i = 0; i < BattleSearchIndex.length; i++) {
            if (!passType) {
                var searchPass = searchPasses.shift();
                if (!searchPass)
                    break;
                passType = searchPass[0];
                i = searchPass[1];
                query = searchPass[2];
            }
            var entry = BattleSearchIndex[i];
            var id = entry[0];
            var type = entry[1];
            if (!id)
                break;
            if (passType === 'fuzzy') {
                // fuzzy match pass; stop after 2 results
                if (count >= 2) {
                    passType = '';
                    continue;
                }
                nearMatch = true;
            }
            else if (passType === 'exact') {
                // exact pass; stop after 1 result
                if (count >= 1) {
                    passType = '';
                    continue;
                }
            }
            else if (id.substr(0, query.length) !== query) {
                // regular pass, time to move onto our next match
                passType = '';
                continue;
            }
            if (entry.length > 2) {
                // alias entry
                if (passType !== 'alias')
                    continue;
            }
            else {
                // normal entry
                if (passType === 'alias')
                    continue;
            }
            var typeIndex = DexSearch.typeTable[type];
            // For performance, with a query length of 1, we only fill the first bucket
            if (query.length === 1 && typeIndex !== (searchType ? searchTypeIndex : 1))
                continue;
            // For pokemon queries, accept types/tier/abilities/moves/eggroups as filters
            if (searchType === 'pokemon' && (typeIndex === 5 || typeIndex > 7))
                continue;
            if (searchType === 'pokemon' && typeIndex === 3 && this.dex.gen < 9)
                continue;
            // For move queries, accept types/categories as filters
            if (searchType === 'move' && ((typeIndex !== 8 && typeIndex > 4) || typeIndex === 3))
                continue;
            // For move queries in the teambuilder, don't accept pokemon as filters
            if (searchType === 'move' && illegal && typeIndex === 1)
                continue;
            // For move queries in the teambuilder, only accept pokemon as filters
            if (searchType === 'location' && illegal && typeIndex != 1 && typeIndex != 10)
                continue;
            // For ability/item queries, don't accept anything else as a filter
            if ((searchType === 'ability' || searchType === 'item') && typeIndex !== searchTypeIndex)
                continue;
            // Query was a type name followed 'type'; only show types
            if (qFilterType === 'type' && typeIndex !== 2)
                continue;
            // hardcode cases of duplicate non-consecutive aliases
            if ((id === 'megax' || id === 'megay') && 'mega'.startsWith(query))
                continue;
            var matchStart = 0;
            var matchEnd = 0;
            if (passType === 'alias') {
                // alias entry
                // [aliasid, type, originalid, matchStart, originalindex]
                matchStart = entry[3];
                var originalIndex = entry[2];
                if (matchStart) {
                    matchEnd = matchStart + query.length;
                    matchStart += (BattleSearchIndexOffset[originalIndex][matchStart] || '0').charCodeAt(0) - 48;
                    matchEnd += (BattleSearchIndexOffset[originalIndex][matchEnd - 1] || '0').charCodeAt(0) - 48;
                }
                id = BattleSearchIndex[originalIndex][0];
            }
            else {
                matchEnd = query.length;
                if (matchEnd)
                    matchEnd += (BattleSearchIndexOffset[i][matchEnd - 1] || '0').charCodeAt(0) - 48;
            }
            // some aliases are substrings
            if (queryAlias === id && query !== id)
                continue;
            if (searchType && searchTypeIndex !== typeIndex) {
                // This is a filter, set it as an instafilter candidate
                if (!instafilter || instafilterSort[typeIndex] < instafilterSort[instafilter[2]]) {
                    instafilter = [type, id, typeIndex];
                }
            }
            // show types above Arceus formes
            if (topbufIndex < 0 && searchTypeIndex < 2 && passType === 'alias' && !bufs[1].length && bufs[2].length) {
                topbufIndex = 2;
            }
            if (illegal && typeIndex === searchTypeIndex) {
                // Always show illegal results under legal results.
                // This is done by putting legal results (and the type header)
                // in bucket 0, and illegal results in the searchType's bucket.
                // searchType buckets are always on top (but under bucket 0), so
                // illegal results will be seamlessly right under legal results.
                if (!bufs[typeIndex].length && !bufs[0].length) {
                    bufs[0] = [['header', DexSearch.typeName[type]]];
                }
                if (!(id in illegal))
                    typeIndex = 0;
            }
            else {
                if (!bufs[typeIndex].length) {
                    bufs[typeIndex] = [['header', DexSearch.typeName[type]]];
                }
            }
            // don't match duplicate aliases
            var curBufLength = (passType === 'alias' && bufs[typeIndex].length);
            if (curBufLength && bufs[typeIndex][curBufLength - 1][1] === id)
                continue;
            bufs[typeIndex].push([type, id, matchStart, matchEnd]);
            count++;
        }
        var topbuf = [];
        if (nearMatch) {
            topbuf = [['html', "<em>No exact match found. The closest matches alphabetically are:</em>"]];
        }
        if (topbufIndex >= 0) {
            topbuf = topbuf.concat(bufs[topbufIndex]);
            bufs[topbufIndex] = [];
        }
        if (searchTypeIndex >= 0) {
            topbuf = topbuf.concat(bufs[0]);
            topbuf = topbuf.concat(bufs[searchTypeIndex]);
            bufs[searchTypeIndex] = [];
            bufs[0] = [];
        }
        if (instafilter && count < 20) {
            // Result count is less than 20, so we can instafilter
            bufs.push(this.instafilter(searchType, instafilter[0], instafilter[1]));
        }
        this.results = Array.prototype.concat.apply(topbuf, bufs);
        return this.results;
    };
    DexSearch.prototype.instafilter = function (searchType, fType, fId) {
        var _a;
        var buf = [];
        var illegalBuf = [];
        var illegal = (_a = this.typedSearch) === null || _a === void 0 ? void 0 : _a.illegalReasons;
        if (searchType === 'pokemon') {
            switch (fType) {
                case 'type':
                    var type = fId.charAt(0).toUpperCase() + fId.slice(1);
                    buf.push(['header', "".concat(type, "-type Pok&eacute;mon")]);
                    for (var id in BattlePokedex) {
                        if (!BattlePokedex[id].types)
                            continue;
                        if (this.dex.species.get(id).types.includes(type)) {
                            (illegal && id in illegal ? illegalBuf : buf).push(['pokemon', id]);
                        }
                    }
                    break;
                case 'ability':
                    var ability = Dex.abilities.get(fId).name;
                    buf.push(['header', "".concat(ability, " Pok&eacute;mon")]);
                    for (var id in BattlePokedex) {
                        if (!BattlePokedex[id].abilities)
                            continue;
                        if (Dex.hasAbility(this.dex.species.get(id), ability)) {
                            (illegal && id in illegal ? illegalBuf : buf).push(['pokemon', id]);
                        }
                    }
                    break;
            }
        }
        else if (searchType === 'move') {
            switch (fType) {
                case 'type':
                    var type = fId.charAt(0).toUpperCase() + fId.slice(1);
                    buf.push(['header', "".concat(type, "-type moves")]);
                    for (var id in BattleMovedex) {
                        if (BattleMovedex[id].type === type) {
                            (illegal && id in illegal ? illegalBuf : buf).push(['move', id]);
                        }
                    }
                    break;
                case 'category':
                    var category = fId.charAt(0).toUpperCase() + fId.slice(1);
                    buf.push(['header', "".concat(category, " moves")]);
                    for (var id in BattleMovedex) {
                        if (BattleMovedex[id].category === category) {
                            (illegal && id in illegal ? illegalBuf : buf).push(['move', id]);
                        }
                    }
                    break;
            }
        }
        return __spreadArray(__spreadArray([], buf, true), illegalBuf, true);
    };
    DexSearch.getClosest = function (query) {
        // binary search through the index!
        var left = 0;
        var right = BattleSearchIndex.length - 1;
        while (right > left) {
            var mid = Math.floor((right - left) / 2 + left);
            if (BattleSearchIndex[mid][0] === query && (mid === 0 || BattleSearchIndex[mid - 1][0] !== query)) {
                // that's us
                return mid;
            }
            else if (BattleSearchIndex[mid][0] < query) {
                left = mid + 1;
            }
            else {
                right = mid - 1;
            }
        }
        if (left >= BattleSearchIndex.length - 1)
            left = BattleSearchIndex.length - 1;
        else if (BattleSearchIndex[left + 1][0] && BattleSearchIndex[left][0] < query)
            left++;
        if (left && BattleSearchIndex[left - 1][0] === query)
            left--;
        return left;
    };
    DexSearch.typeTable = {
        pokemon: 1,
        type: 2,
        tier: 3,
        move: 4,
        item: 5,
        ability: 6,
        egggroup: 7,
        category: 8,
        article: 9,
        location: 10,
    };
    DexSearch.typeName = {
        pokemon: 'Pok&eacute;mon',
        type: 'Type',
        tier: 'Tiers',
        move: 'Moves',
        item: 'Items',
        ability: 'Abilities',
        egggroup: 'Egg group',
        category: 'Category',
        article: 'Article',
        location: 'Location',
    };
    return DexSearch;
}());
var BattleTypedSearch = /** @class */ (function () {
    function BattleTypedSearch(searchType, format, speciesOrSet) {
        if (format === void 0) { format = ''; }
        if (speciesOrSet === void 0) { speciesOrSet = ''; }
        /**
         * Dex for the mod/generation to search.
         */
        this.dex = Dex;
        /**
         * Format is the first of two base filters. It constrains results to things
         * legal in the format, and affects the default sort.
         *
         * This string specifically normalizes out generation number and the words
         * "Doubles" and "Let's Go" from the name.
         */
        this.format = '';
        /**
         * `species` is the second of two base filters. It constrains results to
         * things that species can use, and affects the default sort.
         */
        this.species = '';
        /**
         * `set` is a pseudo-base filter; it has minor effects on move sorting.
         * (Abilities/items can affect what moves are sorted as usable.)
         */
        this.set = null;
        this.formatType = null;
        /**
         * Cached copy of what the results list would be with only base filters
         * (i.e. with an empty `query` and `filters`)
         */
        this.baseResults = null;
        /**
         * Cached copy of all results not in `baseResults` - mostly in case a user
         * is wondering why a specific result isn't showing up.
         */
        this.baseIllegalResults = null;
        this.illegalReasons = null;
        this.results = null;
        this.sortRow = null;
        this.searchType = searchType;
        this.baseResults = null;
        this.baseIllegalResults = null;
        if (format.slice(0, 3) === 'gen') {
            var gen = (Number(format.charAt(3)) || 6);
            format = (format.slice(4) || 'customgame');
            this.dex = Dex.forGen(gen);
        }
        else if (!format) {
            this.dex = Dex;
        }
        if (format.startsWith('dlc1')) {
            if (format.includes('doubles')) {
                this.formatType = 'dlc1doubles';
            }
            else {
                this.formatType = 'dlc1';
            }
            format = format.slice(4);
        }
        if (format.startsWith('stadium')) {
            this.formatType = 'stadium';
            format = format.slice(7);
            if (!format)
                format = 'ou';
        }
        if (format.startsWith('vgc'))
            this.formatType = 'doubles';
        if (format === 'vgc2020')
            this.formatType = 'dlc1doubles';
        if (format.includes('bdsp')) {
            if (format.includes('doubles')) {
                this.formatType = 'bdspdoubles';
            }
            else {
                this.formatType = 'bdsp';
            }
            format = format.slice(4);
            this.dex = Dex.mod('gen8bdsp');
        }
        if (format.includes('doubles') && this.dex.gen > 4 && !this.formatType)
            this.formatType = 'doubles';
        if (format === 'partnersincrime')
            this.formatType = 'doubles';
        if (format.startsWith('ffa') || format === 'freeforall')
            this.formatType = 'doubles';
        if (format.includes('letsgo')) {
            this.formatType = 'letsgo';
            this.dex = Dex.mod('gen7letsgo');
        }
        if (format.includes('nationaldex') || format.startsWith('nd') || format.includes('natdex')) {
            format = (format.startsWith('nd') ? format.slice(2) :
                format.includes('natdex') ? format.slice(6) : format.slice(11));
            this.formatType = 'natdex';
            if (!format)
                format = 'ou';
        }
        if (this.formatType === 'letsgo')
            format = format.slice(6);
        if (format.includes('metronome')) {
            this.formatType = 'metronome';
        }
        if (format.endsWith('nfe')) {
            format = format.slice(3);
            this.formatType = 'nfe';
            if (!format)
                format = 'ou';
        }
        if ((format.endsWith('lc') || format.startsWith('lc')) && format !== 'caplc' && !this.formatType) {
            this.formatType = 'lc';
            format = 'lc';
        }
        if (format.endsWith('draft'))
            format = format.slice(0, -5);
        this.format = format;
        this.species = '';
        this.set = null;
        if (typeof speciesOrSet === 'string') {
            if (speciesOrSet)
                this.species = speciesOrSet;
        }
        else {
            this.set = speciesOrSet;
            this.species = toID(this.set.species);
        }
        if (!searchType || !this.set)
            return;
    }
    BattleTypedSearch.prototype.getResults = function (filters, sortCol, reverseSort) {
        var _this = this;
        if (sortCol === 'type') {
            return __spreadArray([this.sortRow], BattleTypeSearch.prototype.getDefaultResults.call(this), true);
        }
        else if (sortCol === 'category') {
            return __spreadArray([this.sortRow], BattleCategorySearch.prototype.getDefaultResults.call(this), true);
        }
        else if (sortCol === 'ability') {
            return __spreadArray([this.sortRow], BattleAbilitySearch.prototype.getDefaultResults.call(this), true);
        }
        if (!this.baseResults) {
            this.baseResults = this.getBaseResults();
        }
        if (!this.baseIllegalResults) {
            var legalityFilter = {};
            for (var _i = 0, _a = this.baseResults; _i < _a.length; _i++) {
                var _b = _a[_i], resultType = _b[0], value = _b[1];
                if (resultType === this.searchType) {
                    legalityFilter[value] = 1;
                }
            }
            this.baseIllegalResults = [];
            this.illegalReasons = {};
            for (var id in this.getTable()) {
                if (!(id in legalityFilter)) {
                    this.baseIllegalResults.push([this.searchType, id]);
                    this.illegalReasons[id] = 'Illegal';
                }
            }
        }
        var results;
        var illegalResults;
        if (filters) {
            results = [];
            illegalResults = [];
            for (var _c = 0, _d = this.baseResults; _c < _d.length; _c++) {
                var result = _d[_c];
                if (this.filter(result, filters)) {
                    if (results.length && result[0] === 'header' && results[results.length - 1][0] === 'header') {
                        results[results.length - 1] = result;
                    }
                    else {
                        results.push(result);
                    }
                }
            }
            if (results.length && results[results.length - 1][0] === 'header') {
                results.pop();
            }
            for (var _e = 0, _f = this.baseIllegalResults; _e < _f.length; _e++) {
                var result = _f[_e];
                if (this.filter(result, filters)) {
                    illegalResults.push(result);
                }
            }
        }
        else {
            results = __spreadArray([], this.baseResults, true);
            illegalResults = null;
        }
        if (sortCol) {
            results = results.filter(function (_a) {
                var rowType = _a[0];
                return rowType === _this.searchType;
            });
            results = this.sort(results, sortCol, reverseSort);
            if (illegalResults) {
                illegalResults = illegalResults.filter(function (_a) {
                    var rowType = _a[0];
                    return rowType === _this.searchType;
                });
                illegalResults = this.sort(illegalResults, sortCol, reverseSort);
            }
        }
        if (this.sortRow) {
            results = __spreadArray([this.sortRow], results, true);
        }
        if (illegalResults && illegalResults.length) {
            results = __spreadArray(__spreadArray(__spreadArray([], results, true), [['header', "Illegal results"]], false), illegalResults, true);
        }
        return results;
    };
    BattleTypedSearch.prototype.firstLearnsetid = function (speciesid) {
        var _a;
        var table = BattleTeambuilderTable;
        if ((_a = this.formatType) === null || _a === void 0 ? void 0 : _a.startsWith('bdsp'))
            table = table['gen8bdsp'];
        if (this.formatType === 'letsgo')
            table = table['gen7letsgo'];
        if (speciesid in table.learnsets)
            return speciesid;
        var species = this.dex.species.get(speciesid);
        if (!species.exists)
            return '';
        var baseLearnsetid = toID(species.baseSpecies);
        if (typeof species.battleOnly === 'string' && species.battleOnly !== species.baseSpecies) {
            baseLearnsetid = toID(species.battleOnly);
        }
        if (baseLearnsetid in table.learnsets)
            return baseLearnsetid;
        return '';
    };
    BattleTypedSearch.prototype.nextLearnsetid = function (learnsetid, speciesid) {
        if (learnsetid === 'lycanrocdusk' || (speciesid === 'rockruff' && learnsetid === 'rockruff')) {
            return 'rockruffdusk';
        }
        var lsetSpecies = this.dex.species.get(learnsetid);
        if (!lsetSpecies.exists)
            return '';
        if (lsetSpecies.id === 'gastrodoneast')
            return 'gastrodon';
        if (lsetSpecies.id === 'pumpkaboosuper')
            return 'pumpkaboo';
        if (lsetSpecies.id === 'sinisteaantique')
            return 'sinistea';
        if (lsetSpecies.id === 'tatsugiristretchy')
            return 'tatsugiri';
        var next = lsetSpecies.battleOnly || lsetSpecies.changesFrom || lsetSpecies.prevo;
        if (next)
            return toID(next);
        return '';
    };
    BattleTypedSearch.prototype.isHere = function (speciesid, location) {
        if (typeof location.landslot1 !== 'undefined') {
            if (location.landslot1 === speciesid)
                return true;
            if (location.landslot2 === speciesid)
                return true;
            if (location.landslot3 === speciesid)
                return true;
            if (location.landslot4 === speciesid)
                return true;
            if (location.landslot5 === speciesid)
                return true;
            if (location.landslot6 === speciesid)
                return true;
            if (location.landslot7 === speciesid)
                return true;
            if (location.landslot8 === speciesid)
                return true;
            if (location.landslot9 === speciesid)
                return true;
            if (location.landslot10 === speciesid)
                return true;
            if (location.landslot11 === speciesid)
                return true;
            if (location.landslot12 === speciesid)
                return true;
        }
        if (typeof location.fishslot1 !== 'undefined') {
            if (location.fishslot1 === speciesid)
                return true;
            if (location.fishslot2 === speciesid)
                return true;
            if (location.fishslot3 === speciesid)
                return true;
            if (location.fishslot4 === speciesid)
                return true;
            if (location.fishslot5 === speciesid)
                return true;
            if (location.fishslot6 === speciesid)
                return true;
            if (location.fishslot7 === speciesid)
                return true;
            if (location.fishslot8 === speciesid)
                return true;
            if (location.fishslot9 === speciesid)
                return true;
            if (location.fishslot10 === speciesid)
                return true;
        }
        if (typeof location.waterslot1 !== 'undefined') {
            if (location.waterslot1 === speciesid)
                return true;
            if (location.waterslot2 === speciesid)
                return true;
            if (location.waterslot3 === speciesid)
                return true;
            if (location.waterslot4 === speciesid)
                return true;
            if (location.waterslot5 === speciesid)
                return true;
        }
        if (typeof location.rockslot1 !== 'undefined') {
            if (location.rockslot1 === speciesid)
                return true;
            if (location.rockslot2 === speciesid)
                return true;
            if (location.rockslot3 === speciesid)
                return true;
            if (location.rockslot4 === speciesid)
                return true;
            if (location.rockslot5 === speciesid)
                return true;
        }
    };
    BattleTypedSearch.prototype.canLearn = function (speciesid, moveid) {
        var _a;
        var move = this.dex.moves.get(moveid);
        if (this.formatType === 'natdex' && move.isNonstandard && move.isNonstandard !== 'Past') {
            return false;
        }
        var gen = this.dex.gen;
        var genChar = "".concat(gen);
        if (this.format.startsWith('vgc') ||
            this.format.startsWith('battlespot') ||
            this.format.startsWith('battlestadium') ||
            this.format.startsWith('battlefestival') ||
            (this.dex.gen === 9 && this.formatType !== 'natdex')) {
            if (gen === 9) {
                genChar = 'a';
            }
            else if (gen === 8) {
                genChar = 'g';
            }
            else if (gen === 7) {
                genChar = 'q';
            }
            else if (gen === 6) {
                genChar = 'p';
            }
        }
        var learnsetid = this.firstLearnsetid(speciesid);
        while (learnsetid) {
            var table = BattleTeambuilderTable;
            if ((_a = this.formatType) === null || _a === void 0 ? void 0 : _a.startsWith('bdsp'))
                table = table['gen8bdsp'];
            if (this.formatType === 'letsgo')
                table = table['gen7letsgo'];
            var learnset = table.learnsets[learnsetid];
            if (learnset && (moveid in learnset) && (!this.format.startsWith('tradebacks') ? learnset[moveid].includes(genChar) :
                learnset[moveid].includes(genChar) ||
                    (learnset[moveid].includes("".concat(gen + 1)) && move.gen === gen))) {
                return true;
            }
            learnsetid = this.nextLearnsetid(learnsetid, speciesid);
        }
        return false;
    };
    BattleTypedSearch.prototype.getTier = function (pokemon) {
        if (this.formatType === 'metronome') {
            return pokemon.num >= 0 ? String(pokemon.num) : pokemon.tier;
        }
        var table = window.BattleTeambuilderTable;
        var gen = this.dex.gen;
        var tableKey = this.formatType === 'doubles' ? "gen".concat(gen, "doubles") :
            this.formatType === 'letsgo' ? 'gen7letsgo' :
                this.formatType === 'bdsp' ? 'gen8bdsp' :
                    this.formatType === 'bdspdoubles' ? 'gen8bdspdoubles' :
                        this.formatType === 'nfe' ? "gen".concat(gen, "nfe") :
                            this.formatType === 'lc' ? "gen".concat(gen, "lc") :
                                this.formatType === 'dlc1' ? 'gen8dlc1' :
                                    this.formatType === 'dlc1doubles' ? 'gen8dlc1doubles' :
                                        this.formatType === 'natdex' ? "gen".concat(gen, "natdex") :
                                            this.formatType === 'stadium' ? "gen".concat(gen, "stadium").concat(gen > 1 ? gen : '') :
                                                "gen".concat(gen);
        if (table && table[tableKey]) {
            table = table[tableKey];
        }
        if (!table)
            return pokemon.tier;
        var id = pokemon.id;
        if (id in table.overrideTier) {
            return table.overrideTier[id];
        }
        if (id.slice(-5) === 'totem' && id.slice(0, -5) in table.overrideTier) {
            return table.overrideTier[id.slice(0, -5)];
        }
        id = toID(pokemon.baseSpecies);
        if (id in table.overrideTier) {
            return table.overrideTier[id];
        }
        return pokemon.tier;
    };
    return BattleTypedSearch;
}());
var BattlePokemonSearch = /** @class */ (function (_super) {
    __extends(BattlePokemonSearch, _super);
    function BattlePokemonSearch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sortRow = ['sortpokemon', ''];
        return _this;
    }
    BattlePokemonSearch.prototype.getTable = function () {
        return BattlePokedex;
    };
    BattlePokemonSearch.prototype.getDefaultResults = function () {
        var results = [];
        for (var id in BattlePokedex) {
            switch (id) {
                case 'bulbasaur':
                    results.push(['header', "Generation 1"]);
                    break;
                case 'chikorita':
                    results.push(['header', "Generation 2"]);
                    break;
                case 'treecko':
                    results.push(['header', "Generation 3"]);
                    break;
                case 'turtwig':
                    results.push(['header', "Generation 4"]);
                    break;
                case 'victini':
                    results.push(['header', "Generation 5"]);
                    break;
                case 'chespin':
                    results.push(['header', "Generation 6"]);
                    break;
                case 'rowlet':
                    results.push(['header', "Generation 7"]);
                    break;
                case 'grookey':
                    results.push(['header', "Generation 8"]);
                    break;
                case 'sprigatito':
                    results.push(['header', "Generation 9"]);
                    break;
                case 'missingno':
                    results.push(['header', "Glitch"]);
                    break;
                case 'syclar':
                    results.push(['header', "CAP"]);
                    break;
                case 'pikachucosplay':
                    continue;
            }
            results.push(['pokemon', id]);
        }
        return results;
    };
    BattlePokemonSearch.prototype.getBaseResults = function () {
        var _a, _b, _c, _d;
        var format = this.format;
        if (!format)
            return this.getDefaultResults();
        var isVGCOrBS = format.startsWith('battlespot') || format.startsWith('battlestadium') || format.startsWith('vgc');
        var isHackmons = format.includes('hackmons') || format.endsWith('bh');
        var isDoublesOrBS = isVGCOrBS || ((_a = this.formatType) === null || _a === void 0 ? void 0 : _a.includes('doubles'));
        var dex = this.dex;
        var table = BattleTeambuilderTable;
        if ((format.endsWith('cap') || format.endsWith('caplc')) && dex.gen < 9) {
            table = table['gen' + dex.gen];
        }
        else if (isVGCOrBS) {
            table = table['gen' + dex.gen + 'vgc'];
        }
        else if (dex.gen === 9 && isHackmons && !this.formatType) {
            table = table['bh'];
        }
        else if (table['gen' + dex.gen + 'doubles'] && dex.gen > 4 &&
            this.formatType !== 'letsgo' && this.formatType !== 'bdspdoubles' && this.formatType !== 'dlc1doubles' &&
            (format.includes('doubles') || format.includes('triples') ||
                format === 'freeforall' || format.startsWith('ffa') ||
                format === 'partnersincrime')) {
            table = table['gen' + dex.gen + 'doubles'];
            isDoublesOrBS = true;
        }
        else if (dex.gen < 9 && !this.formatType) {
            table = table['gen' + dex.gen];
        }
        else if ((_b = this.formatType) === null || _b === void 0 ? void 0 : _b.startsWith('bdsp')) {
            table = table['gen8' + this.formatType];
        }
        else if (this.formatType === 'letsgo') {
            table = table['gen7letsgo'];
        }
        else if (this.formatType === 'natdex') {
            table = table['gen' + dex.gen + 'natdex'];
        }
        else if (this.formatType === 'metronome') {
            table = table['gen' + dex.gen + 'metronome'];
        }
        else if (this.formatType === 'nfe') {
            table = table['gen' + dex.gen + 'nfe'];
        }
        else if (this.formatType === 'lc') {
            table = table['gen' + dex.gen + 'lc'];
        }
        else if ((_c = this.formatType) === null || _c === void 0 ? void 0 : _c.startsWith('dlc1')) {
            if (this.formatType.includes('doubles')) {
                table = table['gen8dlc1doubles'];
            }
            else {
                table = table['gen8dlc1'];
            }
        }
        else if (this.formatType === 'stadium') {
            table = table['gen' + dex.gen + 'stadium' + (dex.gen > 1 ? dex.gen : '')];
        }
        if (!table.tierSet) {
            table.tierSet = table.tiers.map(function (r) {
                if (typeof r === 'string')
                    return ['pokemon', r];
                return [r[0], r[1]];
            });
            table.tiers = null;
        }
        var tierSet = table.tierSet;
        var slices = table.formatSlices;
        if (format === 'ubers' || format === 'uber')
            tierSet = tierSet.slice(slices.Uber);
        else if (isVGCOrBS || (isHackmons && dex.gen === 9 && !this.formatType)) {
            if (format.endsWith('series13') || isHackmons) {
                // Show Mythicals
            }
            else if (format === 'vgc2010' || format === 'vgc2016' || format.startsWith('vgc2019') ||
                format === 'vgc2022' || format.endsWith('series10') || format.endsWith('series11')) {
                tierSet = tierSet.slice(slices["Restricted Legendary"]);
            }
            else {
                tierSet = tierSet.slice(slices.Regular);
            }
        }
        else if (format === 'ou')
            tierSet = tierSet.slice(slices.OU);
        else if (format === 'uu')
            tierSet = tierSet.slice(slices.UU);
        else if (format === 'ru')
            tierSet = tierSet.slice(slices.RU || slices.UU);
        else if (format === 'nu')
            tierSet = tierSet.slice(slices.NU || slices.RU || slices.UU);
        else if (format === 'pu')
            tierSet = tierSet.slice(slices.PU || slices.NU);
        else if (format === 'zu')
            tierSet = tierSet.slice(slices.ZU || slices.PU || slices.NU);
        else if (format === 'lc' || format === 'lcuu' || format.startsWith('lc') || (format !== 'caplc' && format.endsWith('lc')))
            tierSet = tierSet.slice(slices.LC);
        else if (format === 'cap')
            tierSet = tierSet.slice(0, slices.AG || slices.Uber).concat(tierSet.slice(slices.OU));
        else if (format === 'caplc') {
            tierSet = tierSet.slice(slices['CAP LC'], slices.AG || slices.Uber).concat(tierSet.slice(slices.LC));
        }
        else if (format === 'anythinggoes' || format.endsWith('ag') || format.startsWith('ag')) {
            tierSet = tierSet.slice(slices.AG);
        }
        else if (isHackmons && (dex.gen < 9 || this.formatType === 'natdex')) {
            tierSet = tierSet.slice(slices.AG || slices.Uber);
        }
        else if (format === 'monotype' || format.startsWith('monothreat'))
            tierSet = tierSet.slice(slices.Uber);
        else if (format === 'doublesubers')
            tierSet = tierSet.slice(slices.DUber);
        else if (format === 'doublesou' && dex.gen > 4)
            tierSet = tierSet.slice(slices.DOU);
        else if (format === 'doublesuu')
            tierSet = tierSet.slice(slices.DUU);
        else if (format === 'doublesnu')
            tierSet = tierSet.slice(slices.DNU || slices.DUU);
        else if (((_d = this.formatType) === null || _d === void 0 ? void 0 : _d.startsWith('bdsp')) || this.formatType === 'letsgo' || this.formatType === 'stadium') {
            tierSet = tierSet.slice(slices.Uber);
        }
        else if (!isDoublesOrBS) {
            tierSet = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], tierSet.slice(slices.OU, slices.UU), true), tierSet.slice(slices.AG, slices.Uber), true), tierSet.slice(slices.Uber, slices.OU), true), tierSet.slice(slices.UU), true);
        }
        else {
            tierSet = __spreadArray(__spreadArray(__spreadArray([], tierSet.slice(slices.DOU, slices.DUU), true), tierSet.slice(slices.DUber, slices.DOU), true), tierSet.slice(slices.DUU), true);
        }
        if (dex.gen >= 5) {
            if (format === 'zu' && table.zuBans) {
                tierSet = tierSet.filter(function (_a) {
                    var type = _a[0], id = _a[1];
                    if (id in table.zuBans)
                        return false;
                    return true;
                });
            }
            if ((format === 'monotype' || format.startsWith('monothreat')) && table.monotypeBans) {
                tierSet = tierSet.filter(function (_a) {
                    var type = _a[0], id = _a[1];
                    if (id in table.monotypeBans)
                        return false;
                    return true;
                });
            }
        }
        // Filter out Gmax Pokemon from standard tier selection
        if (!/^(battlestadium|vgc|doublesubers)/g.test(format)) {
            tierSet = tierSet.filter(function (_a) {
                var type = _a[0], id = _a[1];
                if (type === 'header' && id === 'DUber by technicality')
                    return false;
                if (type === 'pokemon')
                    return !id.endsWith('gmax');
                return true;
            });
        }
        return tierSet;
    };
    BattlePokemonSearch.prototype.filter = function (row, filters) {
        if (!filters)
            return true;
        if (row[0] !== 'pokemon')
            return true;
        var species = this.dex.species.get(row[1]);
        for (var _i = 0, filters_1 = filters; _i < filters_1.length; _i++) {
            var _a = filters_1[_i], filterType = _a[0], value = _a[1];
            switch (filterType) {
                case 'type':
                    if (species.types[0] !== value && species.types[1] !== value)
                        return false;
                    break;
                case 'egggroup':
                    if (species.eggGroups[0] !== value && species.eggGroups[1] !== value)
                        return false;
                    break;
                case 'tier':
                    if (this.getTier(species) !== value)
                        return false;
                    break;
                case 'ability':
                    if (!Dex.hasAbility(species, value))
                        return false;
                    break;
                case 'move':
                    if (!this.canLearn(species.id, value))
                        return false;
            }
        }
        return true;
    };
    BattlePokemonSearch.prototype.sort = function (results, sortCol, reverseSort) {
        var _this = this;
        var sortOrder = reverseSort ? -1 : 1;
        if (['hp', 'atk', 'def', 'spa', 'spd', 'spe'].includes(sortCol)) {
            return results.sort(function (_a, _b) {
                var rowType1 = _a[0], id1 = _a[1];
                var rowType2 = _b[0], id2 = _b[1];
                var stat1 = _this.dex.species.get(id1).baseStats[sortCol];
                var stat2 = _this.dex.species.get(id2).baseStats[sortCol];
                return (stat2 - stat1) * sortOrder;
            });
        }
        else if (sortCol === 'bst') {
            return results.sort(function (_a, _b) {
                var rowType1 = _a[0], id1 = _a[1];
                var rowType2 = _b[0], id2 = _b[1];
                var base1 = _this.dex.species.get(id1).baseStats;
                var base2 = _this.dex.species.get(id2).baseStats;
                var bst1 = base1.hp + base1.atk + base1.def + base1.spa + base1.spd + base1.spe;
                var bst2 = base2.hp + base2.atk + base2.def + base2.spa + base2.spd + base2.spe;
                return (bst2 - bst1) * sortOrder;
            });
        }
        else if (sortCol === 'name') {
            return results.sort(function (_a, _b) {
                var rowType1 = _a[0], id1 = _a[1];
                var rowType2 = _b[0], id2 = _b[1];
                var name1 = id1;
                var name2 = id2;
                return (name1 < name2 ? -1 : name1 > name2 ? 1 : 0) * sortOrder;
            });
        }
        throw new Error("invalid sortcol");
    };
    return BattlePokemonSearch;
}(BattleTypedSearch));
var BattleAbilitySearch = /** @class */ (function (_super) {
    __extends(BattleAbilitySearch, _super);
    function BattleAbilitySearch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BattleAbilitySearch.prototype.getTable = function () {
        return BattleAbilities;
    };
    BattleAbilitySearch.prototype.getDefaultResults = function () {
        var results = [];
        for (var id in BattleAbilities) {
            results.push(['ability', id]);
        }
        return results;
    };
    BattleAbilitySearch.prototype.getBaseResults = function () {
        if (!this.species)
            return this.getDefaultResults();
        var format = this.format;
        var isHackmons = (format.includes('hackmons') || format.endsWith('bh'));
        var isAAA = (format === 'almostanyability' || format.includes('aaa'));
        var dex = this.dex;
        var species = dex.species.get(this.species);
        var abilitySet = [['header', "Abilities"]];
        if (species.isMega) {
            abilitySet.unshift(['html', "Will be <strong>".concat(species.abilities['0'], "</strong> after Mega Evolving.")]);
            species = dex.species.get(species.baseSpecies);
        }
        abilitySet.push(['ability', toID(species.abilities['0'])]);
        if (species.abilities['1']) {
            abilitySet.push(['ability', toID(species.abilities['1'])]);
        }
        if (species.abilities['H']) {
            abilitySet.push(['header', "Hidden Ability"]);
            abilitySet.push(['ability', toID(species.abilities['H'])]);
        }
        if (species.abilities['S']) {
            abilitySet.push(['header', "Special Event Ability"]);
            abilitySet.push(['ability', toID(species.abilities['S'])]);
        }
        if (isAAA || format.includes('metronomebattle') || isHackmons) {
            var abilities = [];
            for (var i in this.getTable()) {
                var ability = dex.abilities.get(i);
                if (ability.isNonstandard)
                    continue;
                if (ability.gen > dex.gen)
                    continue;
                abilities.push(ability.id);
            }
            var goodAbilities = [['header', "Abilities"]];
            var poorAbilities = [['header', "Situational Abilities"]];
            var badAbilities = [['header', "Unviable Abilities"]];
            for (var _i = 0, _a = abilities.sort().map(function (abil) { return dex.abilities.get(abil); }); _i < _a.length; _i++) {
                var ability = _a[_i];
                var rating = ability.rating;
                if (ability.id === 'normalize')
                    rating = 3;
                if (rating >= 3) {
                    goodAbilities.push(['ability', ability.id]);
                }
                else if (rating >= 2) {
                    poorAbilities.push(['ability', ability.id]);
                }
                else {
                    badAbilities.push(['ability', ability.id]);
                }
            }
            abilitySet = __spreadArray(__spreadArray(__spreadArray([], goodAbilities, true), poorAbilities, true), badAbilities, true);
            if (species.isMega) {
                if (isAAA) {
                    abilitySet.unshift(['html', "Will be <strong>".concat(species.abilities['0'], "</strong> after Mega Evolving.")]);
                }
                // species is unused after this, so no need to replace
            }
        }
        return abilitySet;
    };
    BattleAbilitySearch.prototype.filter = function (row, filters) {
        if (!filters)
            return true;
        if (row[0] !== 'ability')
            return true;
        var ability = this.dex.abilities.get(row[1]);
        for (var _i = 0, filters_2 = filters; _i < filters_2.length; _i++) {
            var _a = filters_2[_i], filterType = _a[0], value = _a[1];
            switch (filterType) {
                case 'pokemon':
                    if (!Dex.hasAbility(this.dex.species.get(value), ability.name))
                        return false;
                    break;
            }
        }
        return true;
    };
    BattleAbilitySearch.prototype.sort = function (results, sortCol, reverseSort) {
        throw new Error("invalid sortcol");
    };
    return BattleAbilitySearch;
}(BattleTypedSearch));
var BattleItemSearch = /** @class */ (function (_super) {
    __extends(BattleItemSearch, _super);
    function BattleItemSearch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BattleItemSearch.prototype.getTable = function () {
        return BattleItems;
    };
    BattleItemSearch.prototype.getDefaultResults = function () {
        var _a;
        var table = BattleTeambuilderTable;
        if ((_a = this.formatType) === null || _a === void 0 ? void 0 : _a.startsWith('bdsp')) {
            table = table['gen8bdsp'];
        }
        else if (this.formatType === 'natdex') {
            table = table['gen' + this.dex.gen + 'natdex'];
        }
        else if (this.formatType === 'metronome') {
            table = table['gen' + this.dex.gen + 'metronome'];
        }
        else if (this.dex.gen < 9) {
            table = table['gen' + this.dex.gen];
        }
        if (!table.itemSet) {
            table.itemSet = table.items.map(function (r) {
                if (typeof r === 'string') {
                    return ['item', r];
                }
                return [r[0], r[1]];
            });
            table.items = null;
        }
        return table.itemSet;
    };
    BattleItemSearch.prototype.getBaseResults = function () {
        var _a;
        if (!this.species)
            return this.getDefaultResults();
        var speciesName = this.dex.species.get(this.species).name;
        var results = this.getDefaultResults();
        var speciesSpecific = [];
        for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
            var row = results_1[_i];
            if (row[0] !== 'item')
                continue;
            if ((_a = this.dex.items.get(row[1]).itemUser) === null || _a === void 0 ? void 0 : _a.includes(speciesName)) {
                speciesSpecific.push(row);
            }
        }
        if (speciesSpecific.length) {
            return __spreadArray(__spreadArray([
                ['header', "Specific to " + speciesName]
            ], speciesSpecific, true), results, true);
        }
        return results;
    };
    BattleItemSearch.prototype.filter = function (row, filters) {
        if (!filters)
            return true;
        if (row[0] !== 'ability')
            return true;
        var ability = this.dex.abilities.get(row[1]);
        for (var _i = 0, filters_3 = filters; _i < filters_3.length; _i++) {
            var _a = filters_3[_i], filterType = _a[0], value = _a[1];
            switch (filterType) {
                case 'pokemon':
                    if (!Dex.hasAbility(this.dex.species.get(value), ability.name))
                        return false;
                    break;
            }
        }
        return true;
    };
    BattleItemSearch.prototype.sort = function (results, sortCol, reverseSort) {
        throw new Error("invalid sortcol");
    };
    return BattleItemSearch;
}(BattleTypedSearch));
var BattleLocationSearch = /** @class */ (function (_super) {
    __extends(BattleLocationSearch, _super);
    function BattleLocationSearch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sortRow = ['sortmove', ''];
        return _this;
    }
    BattleLocationSearch.prototype.getTable = function () {
        return BattleLocationdex;
    };
    BattleLocationSearch.prototype.getDefaultResults = function () {
        var results = [];
        results.push(['header', "Location"]);
        for (var id in BattleLocationdex) {
            results.push(['location', id]);
        }
        return results;
    };
    BattleLocationSearch.prototype.filter = function (row, filters) {
        if (!filters)
            return true;
        if (row[0] !== 'location')
            return true;
        var location = BattleLocationdex[row[1]];
        for (var _i = 0, filters_4 = filters; _i < filters_4.length; _i++) {
            var _a = filters_4[_i], filterType = _a[0], value = _a[1];
            switch (filterType) {
                case 'pokemon':
                    if (!this.isHere(value, location))
                        return false;
                    break;
            }
        }
        return true;
    };
    BattleLocationSearch.prototype.sort = function (results, sortCol, reverseSort) {
        var sortOrder = reverseSort ? -1 : 1;
        switch (sortCol) {
            case 'name':
                return results.sort(function (_a, _b) {
                    var name1 = id1;
                    var name2 = id2;
                    return (name1 < name2 ? -1 : name1 > name2 ? 1 : 0) * sortOrder;
                });
        }
        throw new Error("invalid sortcol");
    };
    return BattleLocationSearch;
}(BattleTypedSearch));
var BattleMoveSearch = /** @class */ (function (_super) {
    __extends(BattleMoveSearch, _super);
    function BattleMoveSearch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sortRow = ['sortmove', ''];
        return _this;
    }
    BattleMoveSearch.prototype.getTable = function () {
        return BattleMovedex;
    };
    BattleMoveSearch.prototype.getDefaultResults = function () {
        var results = [];
        results.push(['header', "Moves"]);
        for (var id in BattleMovedex) {
            switch (id) {
                case 'paleowave':
                    results.push(['header', "CAP moves"]);
                    break;
                case 'magikarpsrevenge':
                    continue;
            }
            results.push(['move', id]);
        }
        return results;
    };
    BattleMoveSearch.prototype.moveIsNotUseless = function (id, species, moves, set) {
        var _a, _b, _c;
        var dex = this.dex;
        var abilityid = set ? toID(set.ability) : '';
        var itemid = set ? toID(set.item) : '';
        if (dex.gen === 1) {
            // Usually not useless for Gen 1
            if ([
                'acidarmor', 'amnesia', 'barrier', 'bind', 'blizzard', 'clamp', 'confuseray', 'counter', 'firespin', 'growth', 'headbutt', 'hyperbeam', 'mirrormove', 'pinmissile', 'razorleaf', 'sing', 'slash', 'sludge', 'twineedle', 'wrap',
            ].includes(id)) {
                return true;
            }
            // Usually useless for Gen 1
            if ([
                'disable', 'haze', 'leechseed', 'quickattack', 'roar', 'thunder', 'toxic', 'triattack', 'waterfall', 'whirlwind',
            ].includes(id)) {
                return false;
            }
            // Not useless only when certain moves aren't present
            switch (id) {
                case 'bubblebeam': return (!moves.includes('surf') && !moves.includes('blizzard'));
                case 'doubleedge': return !moves.includes('bodyslam');
                case 'doublekick': return !moves.includes('submission');
                case 'firepunch': return !moves.includes('fireblast');
                case 'megadrain': return !moves.includes('razorleaf') && !moves.includes('surf');
                case 'megakick': return !moves.includes('hyperbeam');
                case 'reflect': return !moves.includes('barrier') && !moves.includes('acidarmor');
                case 'stomp': return !moves.includes('headbutt');
                case 'submission': return !moves.includes('highjumpkick');
                case 'thunderpunch': return !moves.includes('thunderbolt');
                case 'triattack': return !moves.includes('bodyslam');
            }
            // Useful and Useless moves for Stadium OU, which changes many game mechanics.
            if (this.formatType === 'stadium') {
                if (['doubleedge', 'focusenergy', 'haze'].includes(id))
                    return true;
                if (['hyperbeam', 'sing', 'hypnosis'].includes(id))
                    return false;
                switch (id) {
                    case 'fly': return !moves.includes('drillpeck');
                    case 'dig': return !moves.includes('earthquake');
                }
            }
        }
        if (this.formatType === 'letsgo') {
            if (['megadrain', 'teleport'].includes(id))
                return true;
        }
        if (this.formatType === 'metronome') {
            if (id === 'metronome')
                return true;
        }
        if (itemid === 'pidgeotite')
            abilityid = 'noguard';
        if (itemid === 'blastoisinite')
            abilityid = 'megalauncher';
        if (itemid === 'aerodactylite')
            abilityid = 'toughclaws';
        if (itemid === 'glalitite')
            abilityid = 'refrigerate';
        switch (id) {
            case 'fakeout':
            case 'flamecharge':
            case 'nuzzle':
            case 'poweruppunch':
                return abilityid !== 'sheerforce';
            case 'solarbeam':
            case 'solarblade':
                return ['desolateland', 'drought', 'chlorophyll', 'orichalcumpulse'].includes(abilityid) || itemid === 'powerherb';
            case 'dynamicpunch':
            case 'grasswhistle':
            case 'inferno':
            case 'sing':
            case 'zapcannon':
                return abilityid === 'noguard';
            case 'heatcrash':
            case 'heavyslam':
                return species.weightkg >= (species.evos ? 75 : 130);
            case 'aerialace':
                return ['technician', 'toughclaws'].includes(abilityid) && !moves.includes('bravebird');
            case 'ancientpower':
                return ['serenegrace', 'technician'].includes(abilityid) || !moves.includes('powergem');
            case 'aquajet':
                return !moves.includes('jetpunch');
            case 'aurawheel':
                return species.baseSpecies === 'Morpeko';
            case 'axekick':
                return !moves.includes('highjumpkick');
            case 'bellydrum':
                return moves.includes('aquajet') || moves.includes('jetpunch') || moves.includes('extremespeed') ||
                    ['iceface', 'unburden'].includes(abilityid);
            case 'bulletseed':
                return ['skilllink', 'technician'].includes(abilityid);
            case 'chillingwater':
                return !moves.includes('scald');
            case 'counter':
                return species.baseStats.hp >= 65;
            case 'darkvoid':
                return dex.gen < 7;
            case 'dualwingbeat':
                return abilityid === 'technician' || !moves.includes('drillpeck');
            case 'feint':
                return abilityid === 'refrigerate';
            case 'grassyglide':
                return abilityid === 'grassysurge';
            case 'gyroball':
                return species.baseStats.spe <= 60;
            case 'headbutt':
                return abilityid === 'serenegrace';
            case 'hex':
                return !moves.includes('infernalparade');
            case 'hiddenpowerelectric':
                return (dex.gen < 4 && !moves.includes('thunderpunch')) && !moves.includes('thunderbolt');
            case 'hiddenpowerfighting':
                return (dex.gen < 4 && !moves.includes('brickbreak')) && !moves.includes('aurasphere') && !moves.includes('focusblast');
            case 'hiddenpowerfire':
                return (dex.gen < 4 && !moves.includes('firepunch')) && !moves.includes('flamethrower') &&
                    !moves.includes('mysticalfire') && !moves.includes('burningjealousy');
            case 'hiddenpowergrass':
                return !moves.includes('energyball') && !moves.includes('grassknot') && !moves.includes('gigadrain');
            case 'hiddenpowerice':
                return !moves.includes('icebeam') && (dex.gen < 4 && !moves.includes('icepunch')) ||
                    (dex.gen > 5 && !moves.includes('aurorabeam') && !moves.includes('glaciate'));
            case 'hiddenpowerflying':
                return dex.gen < 4 && !moves.includes('drillpeck');
            case 'hiddenpowerbug':
                return dex.gen < 4 && !moves.includes('megahorn');
            case 'hiddenpowerpsychic':
                return species.baseSpecies === 'Unown';
            case 'hyperspacefury':
                return species.id === 'hoopaunbound';
            case 'hypnosis':
                return (dex.gen < 4 && !moves.includes('sleeppowder')) || (dex.gen > 6 && abilityid === 'baddreams');
            case 'icepunch':
                return !moves.includes('icespinner') || ['sheerforce', 'ironfist'].includes(abilityid) || itemid === 'punchingglove';
            case 'iciclecrash':
                return !moves.includes('mountaingale');
            case 'icywind':
                // Keldeo needs Hidden Power for Electric/Ghost
                return species.baseSpecies === 'Keldeo' || this.formatType === 'doubles';
            case 'infestation':
                return moves.includes('stickyweb');
            case 'irondefense':
                return !moves.includes('acidarmor');
            case 'irontail':
                return dex.gen > 5 && !moves.includes('ironhead') && !moves.includes('gunkshot') && !moves.includes('poisonjab');
            case 'jumpkick':
                return !moves.includes('highjumpkick') && !moves.includes('axekick');
            case 'lastresort':
                return set && set.moves.length < 3;
            case 'leechlife':
                return dex.gen > 6;
            case 'mysticalfire':
                return dex.gen > 6 && !moves.includes('flamethrower');
            case 'naturepower':
                return dex.gen === 5;
            case 'nightslash':
                return !moves.includes('crunch') && !(moves.includes('knockoff') && dex.gen >= 6);
            case 'outrage':
                return !moves.includes('glaiverush');
            case 'petaldance':
                return abilityid === 'owntempo';
            case 'phantomforce':
                return (!moves.includes('poltergeist') && !moves.includes('shadowclaw')) || this.formatType === 'doubles';
            case 'poisonfang':
                return species.types.includes('Poison') && !moves.includes('gunkshot') && !moves.includes('poisonjab');
            case 'relicsong':
                return species.id === 'meloetta';
            case 'refresh':
                return !moves.includes('aromatherapy') && !moves.includes('healbell');
            case 'risingvoltage':
                return abilityid === 'electricsurge' || abilityid === 'hadronengine';
            case 'rocktomb':
                return abilityid === 'technician';
            case 'selfdestruct':
                return dex.gen < 5 && !moves.includes('explosion');
            case 'shadowpunch':
                return abilityid === 'ironfist' && !moves.includes('ragefist');
            case 'shelter':
                return !moves.includes('acidarmor') && !moves.includes('irondefense');
            case 'smackdown':
                return species.types.includes('Ground');
            case 'smartstrike':
                return species.types.includes('Steel') && !moves.includes('ironhead');
            case 'soak':
                return abilityid === 'unaware';
            case 'steelwing':
                return !moves.includes('ironhead');
            case 'stompingtantrum':
                return (!moves.includes('earthquake') && !moves.includes('drillrun')) || this.formatType === 'doubles';
            case 'stunspore':
                return !moves.includes('thunderwave');
            case 'technoblast':
                return dex.gen > 5 && itemid.endsWith('drive') || itemid === 'dousedrive';
            case 'teleport':
                return dex.gen > 7;
            case 'terrainpulse':
            case 'waterpulse':
                return ['megalauncher', 'technician'].includes(abilityid) && !moves.includes('originpulse');
            case 'toxicspikes':
                return abilityid !== 'toxicdebris';
            case 'trickroom':
                return species.baseStats.spe <= 100;
        }
        if (this.formatType === 'doubles' && BattleMoveSearch.GOOD_DOUBLES_MOVES.includes(id)) {
            return true;
        }
        var moveData = BattleMovedex[id];
        if (!moveData)
            return true;
        if (moveData.category === 'Status') {
            return BattleMoveSearch.GOOD_STATUS_MOVES.includes(id);
        }
        if (moveData.basePower < 75) {
            return BattleMoveSearch.GOOD_WEAK_MOVES.includes(id);
        }
        if (id === 'skydrop')
            return true;
        // strong moves
        if ((_a = moveData.flags) === null || _a === void 0 ? void 0 : _a.charge) {
            return itemid === 'powerherb';
        }
        if ((_b = moveData.flags) === null || _b === void 0 ? void 0 : _b.recharge) {
            return false;
        }
        if (((_c = moveData.flags) === null || _c === void 0 ? void 0 : _c.slicing) && abilityid === 'sharpness') {
            return true;
        }
        return !BattleMoveSearch.BAD_STRONG_MOVES.includes(id);
    };
    BattleMoveSearch.prototype.getBaseResults = function () {
        var _a, _b, _c, _d;
        if (!this.species)
            return this.getDefaultResults();
        var dex = this.dex;
        var species = dex.species.get(this.species);
        var format = this.format;
        var isHackmons = (format.includes('hackmons') || format.endsWith('bh'));
        var isSTABmons = (format.includes('stabmons') || format === 'staaabmons');
        var isTradebacks = format.includes('tradebacks');
        var regionBornLegality = dex.gen >= 6 &&
            /^battle(spot|stadium|festival)/.test(format) || format.startsWith('vgc') ||
            (dex.gen === 9 && this.formatType !== 'natdex');
        var learnsetid = this.firstLearnsetid(species.id);
        var moves = [];
        var sketchMoves = [];
        var sketch = false;
        var gen = '' + dex.gen;
        var lsetTable = BattleTeambuilderTable;
        if ((_a = this.formatType) === null || _a === void 0 ? void 0 : _a.startsWith('bdsp'))
            lsetTable = lsetTable['gen8bdsp'];
        if (this.formatType === 'letsgo')
            lsetTable = lsetTable['gen7letsgo'];
        if ((_b = this.formatType) === null || _b === void 0 ? void 0 : _b.startsWith('dlc1'))
            lsetTable = lsetTable['gen8dlc1'];
        while (learnsetid) {
            var learnset = lsetTable.learnsets[learnsetid];
            if (learnset) {
                for (var moveid in learnset) {
                    var learnsetEntry = learnset[moveid];
                    var move = dex.moves.get(moveid);
                    var minGenCode = { 6: 'p', 7: 'q', 8: 'g', 9: 'a' };
                    if (regionBornLegality && !learnsetEntry.includes(minGenCode[dex.gen])) {
                        continue;
                    }
                    if (!learnsetEntry.includes(gen) &&
                        (!isTradebacks ? true : !(move.gen <= dex.gen && learnsetEntry.includes('' + (dex.gen + 1))))) {
                        continue;
                    }
                    if (this.formatType !== 'natdex' && move.isNonstandard === "Past") {
                        continue;
                    }
                    if (((_c = this.formatType) === null || _c === void 0 ? void 0 : _c.startsWith('dlc1')) &&
                        ((_d = BattleTeambuilderTable['gen8dlc1']) === null || _d === void 0 ? void 0 : _d.nonstandardMoves.includes(moveid))) {
                        continue;
                    }
                    if (moves.includes(moveid))
                        continue;
                    moves.push(moveid);
                    if (moveid === 'sketch')
                        sketch = true;
                    if (moveid === 'hiddenpower') {
                        moves.push('hiddenpowerbug', 'hiddenpowerdark', 'hiddenpowerdragon', 'hiddenpowerelectric', 'hiddenpowerfighting', 'hiddenpowerfire', 'hiddenpowerflying', 'hiddenpowerghost', 'hiddenpowergrass', 'hiddenpowerground', 'hiddenpowerice', 'hiddenpowerpoison', 'hiddenpowerpsychic', 'hiddenpowerrock', 'hiddenpowersteel', 'hiddenpowerwater');
                    }
                }
            }
            learnsetid = this.nextLearnsetid(learnsetid, species.id);
        }
        if (sketch || isHackmons) {
            if (isHackmons)
                moves = [];
            for (var id in BattleMovedex) {
                if (!format.startsWith('cap') && (id === 'paleowave' || id === 'shadowstrike'))
                    continue;
                var move = dex.moves.get(id);
                if (move.gen > dex.gen)
                    continue;
                if (sketch) {
                    if (move.noSketch || move.isMax || move.isZ)
                        continue;
                    if (move.isNonstandard && move.isNonstandard !== 'Past')
                        continue;
                    if (move.isNonstandard === 'Past' && this.formatType !== 'natdex')
                        continue;
                    sketchMoves.push(move.id);
                }
                else {
                    if (!(dex.gen < 8 || this.formatType === 'natdex') && move.isZ)
                        continue;
                    if (typeof move.isMax === 'string')
                        continue;
                    if (move.isMax && dex.gen > 8)
                        continue;
                    if (move.isNonstandard === 'Past' && this.formatType !== 'natdex')
                        continue;
                    if (move.isNonstandard === 'LGPE' && this.formatType !== 'letsgo')
                        continue;
                    moves.push(move.id);
                }
            }
        }
        if (this.formatType === 'metronome')
            moves = ['metronome'];
        if (isSTABmons) {
            for (var id in this.getTable()) {
                var move = dex.moves.get(id);
                if (moves.includes(move.id))
                    continue;
                if (move.gen > dex.gen)
                    continue;
                if (move.isZ || move.isMax || (move.isNonstandard && move.isNonstandard !== 'Unobtainable'))
                    continue;
                var speciesTypes = [];
                var moveTypes = [];
                for (var i = dex.gen; i >= species.gen && i >= move.gen; i--) {
                    var genDex = Dex.forGen(i);
                    moveTypes.push(genDex.moves.get(move.name).type);
                    var pokemon = genDex.species.get(species.name);
                    var baseSpecies = genDex.species.get(pokemon.changesFrom || pokemon.name);
                    if (!pokemon.battleOnly)
                        speciesTypes.push.apply(speciesTypes, pokemon.types);
                    var prevo = pokemon.prevo;
                    while (prevo) {
                        var prevoSpecies = genDex.species.get(prevo);
                        speciesTypes.push.apply(speciesTypes, prevoSpecies.types);
                        prevo = prevoSpecies.prevo;
                    }
                    if (pokemon.battleOnly && typeof pokemon.battleOnly === 'string') {
                        species = dex.species.get(pokemon.battleOnly);
                    }
                    var excludedForme = function (s) { return [
                        'Alola', 'Alola-Totem', 'Galar', 'Galar-Zen', 'Hisui', 'Paldea', 'Paldea-Combat', 'Paldea-Blaze', 'Paldea-Aqua',
                    ].includes(s.forme); };
                    if (baseSpecies.otherFormes && !['Wormadam', 'Urshifu'].includes(baseSpecies.baseSpecies)) {
                        if (!excludedForme(species))
                            speciesTypes.push.apply(speciesTypes, baseSpecies.types);
                        for (var _i = 0, _e = baseSpecies.otherFormes; _i < _e.length; _i++) {
                            var formeName = _e[_i];
                            var forme = dex.species.get(formeName);
                            if (!forme.battleOnly && !excludedForme(forme))
                                speciesTypes.push.apply(speciesTypes, forme.types);
                        }
                    }
                }
                var valid = false;
                for (var _f = 0, moveTypes_2 = moveTypes; _f < moveTypes_2.length; _f++) {
                    var type = moveTypes_2[_f];
                    if (speciesTypes.includes(type)) {
                        valid = true;
                        break;
                    }
                }
                if (valid)
                    moves.push(id);
            }
        }
        moves.sort();
        sketchMoves.sort();
        var usableMoves = [];
        var uselessMoves = [];
        for (var _g = 0, moves_2 = moves; _g < moves_2.length; _g++) {
            var id = moves_2[_g];
            var isUsable = this.moveIsNotUseless(id, species, moves, this.set);
            if (isUsable) {
                if (!usableMoves.length)
                    usableMoves.push(['header', "Moves"]);
                usableMoves.push(['move', id]);
            }
            else {
                if (!uselessMoves.length)
                    uselessMoves.push(['header', "Usually useless moves"]);
                uselessMoves.push(['move', id]);
            }
        }
        if (sketchMoves.length) {
            usableMoves.push(['header', "Sketched moves"]);
            uselessMoves.push(['header', "Useless sketched moves"]);
        }
        for (var _h = 0, sketchMoves_2 = sketchMoves; _h < sketchMoves_2.length; _h++) {
            var id = sketchMoves_2[_h];
            var isUsable = this.moveIsNotUseless(id, species, sketchMoves, this.set);
            if (isUsable) {
                usableMoves.push(['move', id]);
            }
            else {
                uselessMoves.push(['move', id]);
            }
        }
        return __spreadArray(__spreadArray([], usableMoves, true), uselessMoves, true);
    };
    BattleMoveSearch.prototype.filter = function (row, filters) {
        if (!filters)
            return true;
        if (row[0] !== 'move')
            return true;
        var move = this.dex.moves.get(row[1]);
        for (var _i = 0, filters_5 = filters; _i < filters_5.length; _i++) {
            var _a = filters_5[_i], filterType = _a[0], value = _a[1];
            switch (filterType) {
                case 'type':
                    if (move.type !== value)
                        return false;
                    break;
                case 'category':
                    if (move.category !== value)
                        return false;
                    break;
                case 'pokemon':
                    if (!this.canLearn(value, move.id))
                        return false;
                    break;
            }
        }
        return true;
    };
    BattleMoveSearch.prototype.sort = function (results, sortCol, reverseSort) {
        var _this = this;
        var sortOrder = reverseSort ? -1 : 1;
        switch (sortCol) {
            case 'power':
                var powerTable_2 = {
                    return: 102, frustration: 102, spitup: 300, trumpcard: 200, naturalgift: 80, grassknot: 120,
                    lowkick: 120, gyroball: 150, electroball: 150, flail: 200, reversal: 200, present: 120,
                    wringout: 120, crushgrip: 120, heatcrash: 120, heavyslam: 120, fling: 130, magnitude: 150,
                    beatup: 24, punishment: 1020, psywave: 1250, nightshade: 1200, seismictoss: 1200,
                    dragonrage: 1140, sonicboom: 1120, superfang: 1350, endeavor: 1399, sheercold: 1501,
                    fissure: 1500, horndrill: 1500, guillotine: 1500,
                };
                return results.sort(function (_a, _b) {
                    var rowType1 = _a[0], id1 = _a[1];
                    var rowType2 = _b[0], id2 = _b[1];
                    var move1 = _this.dex.moves.get(id1);
                    var move2 = _this.dex.moves.get(id2);
                    var pow1 = move1.basePower || powerTable_2[id1] || (move1.category === 'Status' ? -1 : 1400);
                    var pow2 = move2.basePower || powerTable_2[id2] || (move2.category === 'Status' ? -1 : 1400);
                    return (pow2 - pow1) * sortOrder;
                });
            case 'accuracy':
                return results.sort(function (_a, _b) {
                    var rowType1 = _a[0], id1 = _a[1];
                    var rowType2 = _b[0], id2 = _b[1];
                    var accuracy1 = _this.dex.moves.get(id1).accuracy || 0;
                    var accuracy2 = _this.dex.moves.get(id2).accuracy || 0;
                    if (accuracy1 === true)
                        accuracy1 = 101;
                    if (accuracy2 === true)
                        accuracy2 = 101;
                    return (accuracy2 - accuracy1) * sortOrder;
                });
            case 'pp':
                return results.sort(function (_a, _b) {
                    var rowType1 = _a[0], id1 = _a[1];
                    var rowType2 = _b[0], id2 = _b[1];
                    var pp1 = _this.dex.moves.get(id1).pp || 0;
                    var pp2 = _this.dex.moves.get(id2).pp || 0;
                    return (pp2 - pp1) * sortOrder;
                });
            case 'name':
                return results.sort(function (_a, _b) {
                    var rowType1 = _a[0], id1 = _a[1];
                    var rowType2 = _b[0], id2 = _b[1];
                    var name1 = id1;
                    var name2 = id2;
                    return (name1 < name2 ? -1 : name1 > name2 ? 1 : 0) * sortOrder;
                });
        }
        throw new Error("invalid sortcol");
    };
    BattleMoveSearch.GOOD_STATUS_MOVES = [
        'acidarmor', 'agility', 'aromatherapy', 'auroraveil', 'autotomize', 'banefulbunker', 'batonpass', 'bellydrum', 'bulkup', 'calmmind', 'chillyreception', 'clangoroussoul', 'coil', 'cottonguard', 'courtchange', 'curse', 'defog', 'destinybond', 'detect', 'disable', 'dragondance', 'encore', 'extremeevoboost', 'filletaway', 'geomancy', 'glare', 'haze', 'healbell', 'healingwish', 'healorder', 'heartswap', 'honeclaws', 'kingsshield', 'leechseed', 'lightscreen', 'lovelykiss', 'lunardance', 'magiccoat', 'maxguard', 'memento', 'milkdrink', 'moonlight', 'morningsun', 'nastyplot', 'naturesmadness', 'noretreat', 'obstruct', 'painsplit', 'partingshot', 'perishsong', 'protect', 'quiverdance', 'recover', 'reflect', 'reflecttype', 'rest', 'revivalblessing', 'roar', 'rockpolish', 'roost', 'shedtail', 'shellsmash', 'shiftgear', 'shoreup', 'silktrap', 'slackoff', 'sleeppowder', 'sleeptalk', 'softboiled', 'spikes', 'spikyshield', 'spore', 'stealthrock', 'stickyweb', 'strengthsap', 'substitute', 'switcheroo', 'swordsdance', 'synthesis', 'tailglow', 'tailwind', 'taunt', 'thunderwave', 'tidyup', 'toxic', 'transform', 'trick', 'victorydance', 'whirlwind', 'willowisp', 'wish', 'yawn',
    ];
    BattleMoveSearch.GOOD_WEAK_MOVES = [
        'accelerock', 'acrobatics', 'aquacutter', 'avalanche', 'barbbarrage', 'bonemerang', 'bouncybubble', 'bulletpunch', 'buzzybuzz', 'ceaselessedge', 'circlethrow', 'clearsmog', 'doubleironbash', 'dragondarts', 'dragontail', 'drainingkiss', 'endeavor', 'facade', 'firefang', 'flipturn', 'flowertrick', 'freezedry', 'frustration', 'geargrind', 'grassknot', 'gyroball', 'icefang', 'iceshard', 'iciclespear', 'infernalparade', 'knockoff', 'lastrespects', 'lowkick', 'machpunch', 'mortalspin', 'mysticalpower', 'naturesmadness', 'nightshade', 'nuzzle', 'pikapapow', 'populationbomb', 'psychocut', 'psyshieldbash', 'pursuit', 'quickattack', 'ragefist', 'rapidspin', 'return', 'rockblast', 'ruination', 'saltcure', 'scorchingsands', 'seismictoss', 'shadowclaw', 'shadowsneak', 'sizzlyslide', 'stoneaxe', 'storedpower', 'stormthrow', 'suckerpunch', 'superfang', 'surgingstrikes', 'tailslap', 'trailblaze', 'tripleaxel', 'tripledive', 'twinbeam', 'uturn', 'veeveevolley', 'voltswitch', 'watershuriken', 'weatherball',
    ];
    BattleMoveSearch.BAD_STRONG_MOVES = [
        'belch', 'burnup', 'crushclaw', 'dragonrush', 'dreameater', 'eggbomb', 'firepledge', 'flyingpress', 'grasspledge', 'hyperbeam', 'hyperfang', 'hyperspacehole', 'jawlock', 'landswrath', 'megakick', 'megapunch', 'mistyexplosion', 'muddywater', 'nightdaze', 'pollenpuff', 'rockclimb', 'selfdestruct', 'shelltrap', 'skyuppercut', 'slam', 'strength', 'submission', 'synchronoise', 'takedown', 'thrash', 'uproar', 'waterpledge',
    ];
    BattleMoveSearch.GOOD_DOUBLES_MOVES = [
        'allyswitch', 'bulldoze', 'coaching', 'electroweb', 'faketears', 'fling', 'followme', 'healpulse', 'helpinghand', 'junglehealing', 'lifedew', 'lunarblessing', 'muddywater', 'pollenpuff', 'psychup', 'ragepowder', 'safeguard', 'skillswap', 'snipeshot', 'wideguard',
    ];
    return BattleMoveSearch;
}(BattleTypedSearch));
var BattleCategorySearch = /** @class */ (function (_super) {
    __extends(BattleCategorySearch, _super);
    function BattleCategorySearch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BattleCategorySearch.prototype.getTable = function () {
        return { physical: 1, special: 1, status: 1 };
    };
    BattleCategorySearch.prototype.getDefaultResults = function () {
        return [
            ['category', 'physical'],
            ['category', 'special'],
            ['category', 'status'],
        ];
    };
    BattleCategorySearch.prototype.getBaseResults = function () {
        return this.getDefaultResults();
    };
    BattleCategorySearch.prototype.filter = function (row, filters) {
        throw new Error("invalid filter");
    };
    BattleCategorySearch.prototype.sort = function (results, sortCol, reverseSort) {
        throw new Error("invalid sortcol");
    };
    return BattleCategorySearch;
}(BattleTypedSearch));
var BattleTypeSearch = /** @class */ (function (_super) {
    __extends(BattleTypeSearch, _super);
    function BattleTypeSearch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BattleTypeSearch.prototype.getTable = function () {
        return window.BattleTypeChart;
    };
    BattleTypeSearch.prototype.getDefaultResults = function () {
        var results = [];
        for (var id in window.BattleTypeChart) {
            results.push(['type', id]);
        }
        return results;
    };
    BattleTypeSearch.prototype.getBaseResults = function () {
        return this.getDefaultResults();
    };
    BattleTypeSearch.prototype.filter = function (row, filters) {
        throw new Error("invalid filter");
    };
    BattleTypeSearch.prototype.sort = function (results, sortCol, reverseSort) {
        throw new Error("invalid sortcol");
    };
    return BattleTypeSearch;
}(BattleTypedSearch));


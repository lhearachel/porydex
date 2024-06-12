
var PokedexEncountersPanel = PokedexResultPanel.extend({
	initialize: function(id) {
		id = toID(id);
		var location = BattleLocationdex[id];
		this.id = id;
		this.shortTitle = location.name;

		var buf = '<div class="pfx-body dexentry">';

		buf += '<a href="/" class="pfx-backbutton" data-target="back"><i class="fa fa-chevron-left"></i> Pok&eacute;dex</a>';
		buf += '<h1><a href="/encounters/'+id+'" data-target="push" class="subtle">'+location.name+'</a></h1>';

		// distribution
		buf += '<ul class="utilichart metricchart nokbd">';
		buf += '</ul>';

		buf += '</div>';

		this.html(buf);

		setTimeout(this.renderDistribution.bind(this));
	},
	getDistribution: function() {
		if (this.results) return this.results;

        var landRates = BattleLocationdex['rates']['land']
        var surfRates = BattleLocationdex['rates']['surf']
        var rockRates = BattleLocationdex['rates']['rock']
        var oldRodRates = BattleLocationdex['rates']['fish']['old']
        var goodRodRates = BattleLocationdex['rates']['fish']['good']
        var superRodRates = BattleLocationdex['rates']['fish']['super']

		var location = this.id;
		var results = [];

        var formatRate = function(i) {
            return i.toString().padStart(2, 'z') + '% '
        }

        var formatRange = function(min, max) {
            return min.toString().padStart(3, '0') + '-' + max.toString().padStart(3, '0') + ' '
        }

        if (BattleLocationdex[location]['land']['encs'] !== undefined) {
            for (let i = 0; i < BattleLocationdex[location]['land']['encs'].length; i++) {
                let enc = BattleLocationdex[location]['land']['encs'][i];
                let min = enc.minLvl;
                let max = enc.maxLvl;
                let mon = enc.species;
                results.push('L' + formatRate(landRates[i]) + formatRange(min, max) + mon);
            }
        }

        if (BattleLocationdex[location]['surf']['encs'] !== undefined) {
            for (let i = 0; i < BattleLocationdex[location]['surf']['encs'].length; i++) {
                let enc = BattleLocationdex[location]['surf']['encs'][i];
                let min = enc.minLvl;
                let max = enc.maxLvl;
                let mon = enc.species;
                results.push('W' + formatRate(surfRates[i]) + formatRange(min, max) + mon);
            }
        }

        if (BattleLocationdex[location]['rock']['encs'] !== undefined) {
            for (let i = 0; i < BattleLocationdex[location]['rock']['encs'].length; i++) {
                let enc = BattleLocationdex[location]['rock']['encs'][i];
                let min = enc.minLvl;
                let max = enc.maxLvl;
                let mon = enc.species;
                results.push('R' + formatRate(rockRates[i]) + formatRange(min, max) + mon);
            }
        }

        if (BattleLocationdex[location]['fish']['encs'] !== undefined) {
            var oldStart = 0;
            for (let i = 0; i < oldRodRates.length; i++) {
                let enc = BattleLocationdex[location]['fish']['encs'][i + oldStart];
                let min = enc.minLvl;
                let max = enc.maxLvl;
                let mon = enc.species;
                results.push('O' + formatRate(oldRodRates[i]) + formatRange(min, max) + mon);
            }

            var goodStart = oldRodRates.length + oldStart;
            for (let i = 0; i < goodRodRates.length; i++) {
                let enc = BattleLocationdex[location]['fish']['encs'][i + goodStart];
                let min = enc.minLvl;
                let max = enc.maxLvl;
                let mon = enc.species;
                results.push('G' + formatRate(goodRodRates[i]) + formatRange(min, max) + mon);
            }

            var superStart = goodRodRates.length + goodStart;
            for (let i = 0; i < superRodRates.length; i++) {
                let enc = BattleLocationdex[location]['fish']['encs'][i + superStart];
                let min = enc.minLvl;
                let max = enc.maxLvl;
                let mon = enc.species;
                results.push('S' + formatRate(superRodRates[i]) + formatRange(min, max) + mon);
            }
        }

		var last = '';
		for (var i=0; i<results.length; i++) {
			if (results[i].charAt(0) !== last) {
				results.splice(i, 0, results[i].charAt(0).toUpperCase());
				i++;
			}
			last = results[i].charAt(0);
		}
		return this.results = results;
	},
	renderDistribution: function() {
		var results = this.getDistribution();
		this.$chart = this.$('.utilichart');

		if (results.length > 1600/33) {
			this.streamLoading = true;
			this.$el.on('scroll', this.handleScroll.bind(this));

			var panelTop = this.$el.children().offset().top;
			var panelHeight = this.$el.outerHeight();
			var chartTop = this.$chart.offset().top;
			var scrollLoc = this.scrollLoc = this.$el.scrollTop();

			var start = Math.floor((scrollLoc - (chartTop-panelTop)) / 33 - 35);
			var end = Math.floor(start + 35 + panelHeight / 33 + 35);
			if (start < 0) start = 0;
			if (end > results.length-1) end = results.length-1;
			this.start = start, this.end = end;

			// distribution
			var buf = '';
			for (var i=0, len=results.length; i<len; i++) {
				buf += '<li class="result">'+this.renderRow(i, i < start || i > end)+'</li>';
			}
			this.$chart.html(buf);
		} else {
			var buf = '';
			for (var i=0, len=results.length; i<len; i++) {
				buf += '<li class="result">'+this.renderRow(i)+'</li>';
			}
			this.$chart.html(buf);
		}
	},
	renderRow: function(i, offscreen) {
		var results = this.results;
		var id = results[i].substr(13);
		var template = id ? BattlePokedex[id] : undefined;
		if (!template) {
			switch (results[i].charAt(0)) {
			case 'L':
				return '<h3>Land</h3>';
			case 'W':
				return '<h3>Surfing</h3>';
			case 'R':
				return '<h3>Rock Smash</h3>';
            case 'O':
				return '<h3>Old Rod</h3>';
            case 'G':
				return '<h3>Good Rod</h3>';
            case 'S':
				return '<h3>Super Rod</h3>';
			}
			return '<pre>error: "'+results[i]+'"</pre>';
		} else if (offscreen) {
			return ''+template.name+' '+template.abilities['0']+' '+(template.abilities['1']||'')+' '+(template.abilities['H']||'')+'';
		} else {
			var desc = results[i].substr(1,3).replace("z", "")
			return BattleSearch.renderTaggedLocationRowInner(template, desc);
		}
	},
	handleScroll: function() {
		var scrollLoc = this.$el.scrollTop();
		if (Math.abs(scrollLoc - this.scrollLoc) > 20*33) {
			this.renderUpdateDistribution();
		}
	},
	debouncedPurgeTimer: null,
	renderUpdateDistribution: function(fullUpdate) {
		if (this.debouncedPurgeTimer) {
			clearTimeout(this.debouncedPurgeTimer);
			this.debouncedPurgeTimer = null;
		}

		var panelTop = this.$el.children().offset().top;
		var panelHeight = this.$el.outerHeight();
		var chartTop = this.$chart.offset().top;
		var scrollLoc = this.scrollLoc = this.$el.scrollTop();

		var results = this.results;

		var rowFit = Math.floor(panelHeight / 33);

		var start = Math.floor((scrollLoc - (chartTop-panelTop)) / 33 - 35);
		var end = start + 35 + rowFit + 35;
		if (start < 0) start = 0;
		if (end > results.length-1) end = results.length-1;

		var $rows = this.$chart.children();

		if (fullUpdate || start < this.start - rowFit - 30 || end > this.end + rowFit + 30) {
			var buf = '';
			for (var i=0, len=results.length; i<len; i++) {
				buf += '<li class="result">'+this.renderRow(i, (i < start || i > end))+'</li>';
			}
			this.$chart.html(buf);
			this.start = start, this.end = end;
			return;
		}

		if (start < this.start) {
			for (var i = start; i<this.start; i++) {
				$rows[i].innerHTML = this.renderRow(i);
			}
			this.start = start;
		}

		if (end > this.end) {
			for (var i = this.end+1; i<=end; i++) {
				$rows[i].innerHTML = this.renderRow(i);
			}
			this.end = end;
		}

		if (this.end - this.start > rowFit+90) {
			var self = this;
			this.debouncedPurgeTimer = setTimeout(function() {
				self.renderUpdateDistribution(true);
			}, 1000);
		}
	}
});

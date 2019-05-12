/* Author: Jim Camut */



function Calendarize() {
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

	return {

		// Return the days in a month - given a year and the month number
		getDaysInMonth: function(month, year) {
			var date = new Date(year, month, 1);
			var days = [];
			while (date.getMonth() === month) {
				days.push(new Date(date));
				date.setDate(date.getDate() + 1);
			}
			return days;
		},

		// return an array of the first day of each month for a given year
		getMonthsInYear: function(year) {
//			var date = new Date(year, 0, 1);
//			var months = [];
//			var monthCount = 0;
//			while (monthCount < 12) {
//				months.push(new Date(date));
//				date.setMonth(date.getMonth() + 1);
//				monthCount++;
//			}
//			return months;
			
			var start = new Date(year, 7, 1);
			var end = new Date(year+1, 5, 1);
			var months = [];
			var monthCount = 0;
			while (start <= end) {
				months.push( new Date(start) );
				start.setMonth(start.getMonth() + 1);
				monthCount++;
			}
			return months;
			
		},

		getMonthsInRange: function(startDate, endDate) {
			var start = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
			var end = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
			var months = [];
			var monthCount = 0;
			while (start <= end) {
				months.push( new Date(start) );
				start.setMonth(start.getMonth() + 1);
				monthCount++;
			}
			return months;
		},

		// Create a full 12-month calendar
		buildYearCalendar: function(el, year) {
			var _this = this;
			var months = _this.getMonthsInYear(year);

			var opts = {
				showMonth: true,
				showDaysOfWeek: true,
				showYear: true,
				clickHandler: function(e) {
					var day = e.target.getAttribute("data-date");
					//alert(day);
				}
			};

			months.forEach(function(a, b) {
				var $monthNode = _this.buildMonth(a.getMonth(), a.getFullYear(), opts);
				el.appendChild($monthNode);
			});
			
		},

		buildMonthsInRange: function(el, opts, startDate, limit) {
			var _this = this;
			var endDate = new Date( new Date().setDate(startDate.getDate() + limit) );
			var months = _this.getMonthsInRange(startDate, endDate);
			
			opts = opts  || {};
			opts.limitDate = endDate || false;
			if (opts.reverse) months = months.reverse();

			months.forEach(function(a, b) {
				var month = a.getMonth();
				var year = a.getFullYear();
				var $monthNode = _this.buildMonth(month, year, opts);
				el.appendChild($monthNode);
			});
		},

		// Add days and place fillers for a given month
		// This function and the one above needs consolidated
		buildMonth: function(monthNum, year, opts) {
			//if (monthNum === undefined || year === undefined) return "something is missing";
			var _this = this;
			var dtm = new Date(year, monthNum, 1);
			var dtmMonth = dtm.getMonth();
			var prevM = new Date(dtm.setMonth(dtmMonth - 1));
			var nextM = new Date(dtm.setMonth(dtmMonth + 1));
			var daysInMonth = _this.getDaysInMonth(monthNum, year);
			var daysPrevMonth = _this.getDaysInMonth(prevM.getMonth(), prevM.getFullYear());
			var daysNextMonth = _this.getDaysInMonth(nextM.getMonth(), nextM.getFullYear());
			var $monthNode = document.createElement('div');
			var $titleNode = document.createElement('h3');
			var skipLength = daysInMonth[0].getDay();
			var preLength = daysInMonth.length + skipLength;
			var postLength = function() {
				if (preLength % 7 === 0) {
					return 0;
				} else {
					if (preLength < 35) {
						return 35 - preLength;
					} else {
						return 42 - preLength;
					}
				}
			}

			$monthNode.classList.add('month');

			// Add a Title to the month
			if (opts.showMonth) {
				$titleNode.innerText = monthNames[monthNum] + (opts.showYear ? " " + year : '') ;
				$monthNode.appendChild($titleNode);
			}


			// Add Days of week to the top row
			if (opts.showDaysOfWeek) {
				dayNames.forEach(function(a, b) {
					var $dayNode = document.createElement('div');
					$dayNode.classList.add('dow');
					$dayNode.innerText = dayNames[b];
					$monthNode.appendChild($dayNode);
				});
			}


			// Add blank days to fill in before first day
			for (var i = 0; i < skipLength; i++) {
				var $dayNode = document.createElement('div');
				$dayNode.classList.add('dummy-day');
				$dayNode.innerText = daysPrevMonth.length - (skipLength - (i + 1));
				$monthNode.appendChild($dayNode);
			}


			// Place a day for each day of the month
			daysInMonth.forEach(function(c, d) {
				var today = new Date(new Date().setHours(0, 0, 0, 0));
				var $dayNode = document.createElement('div');
				$dayNode.classList.add('day');
				$dayNode.setAttribute("data-date", c);
				$dayNode.innerText = (d + 1);
				var dow = new Date(c).getDay();
				var dateParsed = Date.parse(c);
				var todayParsed = Date.parse(today);
				var firstday = Date.parse('14 Aug 2019 00:00:00 GMT-0700');
				var lastday = Date.parse('04 Jun 2020 00:00:00 GMT-0700');
				var weekend1 = Date.parse('01 Jan 2020 00:00:00 GMT-0800');
				var weekend2 = Date.parse('02 Jan 2020 00:00:00 GMT-0800');
				var weekend3 = Date.parse('03 Jan 2020 00:00:00 GMT-0800');
				var weekend4 = Date.parse('04 Jan 2020 00:00:00 GMT-0800');
				var weekend5 = Date.parse('05 Jan 2020 00:00:00 GMT-0800');
				var weekend6 = Date.parse('17 Feb 2020 00:00:00 GMT-0800');
				var weekend7 = Date.parse('18 Feb 2020 00:00:00 GMT-0800');
				var weekend8 = Date.parse('19 Feb 2020 00:00:00 GMT-0800');
				var weekend9 = Date.parse('20 Feb 2020 00:00:00 GMT-0800');
				var weekend10 = Date.parse('21 Feb 2020 00:00:00 GMT-0800');
				var weekend11 = Date.parse('22 Feb 2020 00:00:00 GMT-0800');
				var weekend12 = Date.parse('23 Feb 2020 00:00:00 GMT-0800');
				var weekend13 = Date.parse('06 Apr 2020 00:00:00 GMT-0700');
				
				var weekend14 = Date.parse('31 Aug 2019 00:00:00 GMT-0700');
				var weekend15 = Date.parse('01 Sep 2019 00:00:00 GMT-0700');
				var weekend16 = Date.parse('02 Sep 2019 00:00:00 GMT-0700');
				var weekend17 = Date.parse('23 Nov 2019 00:00:00 GMT-0800');
				var weekend18 = Date.parse('24 Nov 2019 00:00:00 GMT-0800');
				var weekend19 = Date.parse('25 Nov 2019 00:00:00 GMT-0800');
				var weekend20 = Date.parse('26 Nov 2019 00:00:00 GMT-0800');
				var weekend21 = Date.parse('27 Nov 2019 00:00:00 GMT-0800');
				var weekend22 = Date.parse('28 Nov 2019 00:00:00 GMT-0800');
				var weekend23 = Date.parse('29 Nov 2019 00:00:00 GMT-0800');
				var weekend24 = Date.parse('30 Nov 2019 00:00:00 GMT-0800');
				var weekend25 = Date.parse('23 Dec 2019 00:00:00 GMT-0800');
				var weekend26 = Date.parse('24 Dec 2019 00:00:00 GMT-0800');
				var weekend27 = Date.parse('25 Dec 2019 00:00:00 GMT-0800');
				var weekend28 = Date.parse('26 Dec 2019 00:00:00 GMT-0800');
				var weekend29 = Date.parse('27 Dec 2019 00:00:00 GMT-0800');
				var weekend30 = Date.parse('28 Dec 2019 00:00:00 GMT-0800');
				var weekend31 = Date.parse('29 Dec 2019 00:00:00 GMT-0800');
				var weekend32 = Date.parse('30 Dec 2019 00:00:00 GMT-0800');
				var weekend33 = Date.parse('31 Dec 2019 00:00:00 GMT-0800');
				
				var weekend34 = Date.parse('06 Apr 2020 00:00:00 GMT-0700');
				var weekend35 = Date.parse('07 Apr 2020 00:00:00 GMT-0700');
				var weekend36 = Date.parse('08 Apr 2020 00:00:00 GMT-0700');
				var weekend37 = Date.parse('09 Apr 2020 00:00:00 GMT-0700');
				var weekend38 = Date.parse('10 Apr 2020 00:00:00 GMT-0700');
				var weekend39 = Date.parse('11 Apr 2020 00:00:00 GMT-0700');
				var weekend40 = Date.parse('12 Apr 2020 00:00:00 GMT-0700');
				var weekend41 = Date.parse('23 May 2020 00:00:00 GMT-0700');
				var weekend42 = Date.parse('24 May 2020 00:00:00 GMT-0700');
				var weekend43 = Date.parse('25 May 2020 00:00:00 GMT-0700');
				
				var weekend44 = Date.parse('01 Dec 2019 00:00:00 GMT-0800');
				

				if (dateParsed === todayParsed) $dayNode.classList.add('today');
				if (dateParsed > todayParsed) $dayNode.classList.add('future');
				if (dateParsed <todayParsed) $dayNode.classList.add('past');

//				if (dow === 0 || dow === 6) $dayNode.classList.add('weekend');
				if (dateParsed < firstday || dateParsed > lastday 
						|| dateParsed === weekend1 || dateParsed === weekend2 || dateParsed === weekend3
						|| dateParsed === weekend4 || dateParsed === weekend5 || dateParsed === weekend6
						|| dateParsed === weekend7 || dateParsed === weekend8 || dateParsed === weekend9
						|| dateParsed === weekend10 || dateParsed === weekend11 || dateParsed === weekend12		 
						|| dateParsed === weekend13 || dateParsed === weekend14 || dateParsed === weekend15
						|| dateParsed === weekend16 || dateParsed === weekend17 || dateParsed === weekend18 || dateParsed === weekend19
						|| dateParsed === weekend20 || dateParsed === weekend21 || dateParsed === weekend22
						|| dateParsed === weekend23 || dateParsed === weekend24 || dateParsed === weekend25
						|| dateParsed === weekend26 || dateParsed === weekend27 || dateParsed === weekend28
						|| dateParsed === weekend29 || dateParsed === weekend30 || dateParsed === weekend31
						|| dateParsed === weekend32 || dateParsed === weekend33 || dateParsed === weekend34
						|| dateParsed === weekend35 || dateParsed === weekend36 || dateParsed === weekend37
						|| dateParsed === weekend38 || dateParsed === weekend39 || dateParsed === weekend40
						|| dateParsed === weekend41 || dateParsed === weekend42 || dateParsed === weekend43
						|| dateParsed === weekend44) $dayNode.classList.add('weekend');
				if (dateParsed === firstday || dateParsed === lastday) $dayNode.classList.add('firstday');
				if (opts.onlyCurrent && c < today) $dayNode.classList.add('dummy-day');
				if (opts.limitDate) {
					if (c > opts.limitDate) {
						$dayNode.classList.add('dummy-day');
					}
				}

				if (opts.filterDayOfWeek) {
					var valid = false;
					for (var i = 0; i < opts.filterDayOfWeek.length; i++) {
						if (c.getDay() == opts.filterDayOfWeek[i]) {
							valid = true;
						}
					}
					if (!valid) {
						$dayNode.classList.add('dummy-day');
					}
				}
				if (opts.clickHandler && !$dayNode.classList.contains('dummy-day')) {
					function handleEvent(e) {
						e = e || window.event;
						e.preventDefault();
						e.stopPropagation();
						var touches = false;
						if (!touches) {
							touches = true;
							setTimeout(function() {
								touches = false;
							}, 300);
							opts.clickHandler(e);
						}
					}
					$dayNode.addEventListener("touchstart", handleEvent);
					$dayNode.addEventListener("mousedown", handleEvent);
				}
				$monthNode.appendChild($dayNode);
			});

			// Add in the dummy filler days to make an even block
			for (var j = 0; j < postLength(); j++) {
				var $dayNode = document.createElement('div');
				$dayNode.classList.add('dummy-day');
				$dayNode.innerText = j + 1;
				$monthNode.appendChild($dayNode);
			}

			return $monthNode;

		}
	}
}


var budgetController = (function() {
	var Expense = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};

	Expense.prototype.calcPercentage= function(totalIncome) {
		if(totalIncome > 0) {
			this.percentage = Math.round((this.value/totalIncome)*100);
		} else {
			this.percentage = -1;
		}
	};

	Expense.prototype.getPercentage = function() {
		return this.percentage;
	};

	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var calculateTotal = function(type) {
		var sum = 0;
		data.allItems[type].forEach(function(cur) {
			sum += cur.value;
		});
		data.totals[type] = sum;
	};

	var data = {
		allItems: {
			exp: [],
			inc: [],

		},

		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1
	};
	return {
		addItem: function(type, des, val) {
			var newItem, ID;

			if(data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length = 1].id+1;
			} else {
				ID = 0;
			}

			if (type === 'exp') {
				newItem = new Expense(ID, des, val);
			} else if (type === 'inc') {
				newItem = new Income(ID, des, val);
			}

			data.allItems[type].push(newItem);
			return new Item;
		},
		deleteItem: function(type, id) {
			var ids, index;
			ids = data.allItems[type].map(function(current) {
				return current.id; 
			});

			index = ids.indexOf(id);
			if (index !== -1) {
				data.allItems[type].splice(index, 1);
			}
		},

		calculateBudget: function() {
			calculateTotal('exp');
			calculateTotal('inc');

			data.budget = data.totals.inc - data.totals.exp;

			if (data.totals.inc > 0) {
				data.percentage = Math.round((data.totals.exp/data.totals.inc) * 100);
			} else {
				data.percentage = -1;
			}
		},

		calcPercentages: function() {
			data.allItems.exp.forEach(function (cur) {
				cur.calcPercentage(data.totals.inc);
			});
		},

		getPercentages: function() {
			var allperc = data.allItems.exp.map (function (cur) {
				return cur.getPercentage();
			});
			return allperc;
		}

		getBudget: function() {
			return{
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			};
		},

		testing: function() {
			console.log(data);
		}
	};
})();

var UIController = (function() {
	var DOMstring = {
		inputType: '.add_type',
		inputDescription: '.add_description',
		inputValue: '.add_value',
		inputBtn: '.add_btn',
		incomeContainer: '.expense.list',
		budgetLabel: '.budget_value',
		incomeLabel: '.budget_income--value',
		expenseLabel: 'budget_expenses--percentage',
		percentageLabel: '.budget_expenses--percentage',
		container: '.container',
		expensesPercLabel: '.item_percentage',
		dateLabel: '.budget_title--month'
	};

	var formatNumber = function(num, type) {
		var numSplit, int, dec, type;
		num = Math.abs(num);
		num = num.toFixed(2);
		numSplit = num.split('.');
		int = numSplit[0];
		if (int.length > 3) {
			int = int.substr,(0, int.length-3)+ '.' + int.substr(int.length-3,3);
		}
	}
})


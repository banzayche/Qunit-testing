/*global Backbone */
'use strict';

var listViews = myLibrarryApp.module('listViews', function(listViews, MyLibrarryApp, Backbone){

	listViews.BookItemView = Backbone.Marionette.ItemView.extend({
		tagName: 'tr',
		className: 'book-tr',
		template: '#book-template',

		ui:{
			editBook: '#edit',
			deleteBook: '#delete'
		},
		events: {
			'click @ui.editBook' : 'goEdit',
			'click @ui.deleteBook' : 'goDelete',
			'dblclick' : 'goDetail',			
		},

		goEdit: function(){
			Backbone.history.navigate('book/'+this.model.get('id')+'/edit', {trigger:true,replace: true});
		},
		goDelete: function(){
			this.model.destroy();
		},
		goDetail: function(){
			Backbone.history.navigate('book/'+this.model.get('id')+'/detail', {trigger:true,replace: true});
		}
	});

	listViews.NoChildView = Backbone.Marionette.ItemView.extend({
		tagName: 'tr',
		className: 'empty-collection',
		template: '#noChildView-template',
	});

	listViews.NoChildView = Backbone.Marionette.ItemView.extend({
		tagName: 'tr',
		className: 'empty-collection',
		template: '#noChildView-template',
	});

	listViews.ControlForList = Backbone.Marionette.ItemView.extend({
		template: '#control-list-region-template',
		ui: {
			goVariantListView: '#goVariantList',
			genreContainer: '#filter-atributes-container',
			createBook: '#createBook',
			genreSpan: '.filter-genre',
		},
		events: {
			'click @ui.createBook' : 'goCreateBook',
			'click @ui.goVariantListView' : 'goVariantListView',
			'click @ui.genreSpan' : 'setFilterAttribute',
		},

		onShow: function(){
			this.showFilter();
			this.togleIconVariant();
		},

		goCreateBook: function(){
			Backbone.history.navigate('book/create', {trigger: true, replace: true});
		},
		goVariantListView: function(){
			if(MyLibrarryApp.request('filterState').get('list_type') === 'tile'){
				MyLibrarryApp.request('filterState').set('list_type', 'table');
			} else{
				MyLibrarryApp.request('filterState').set('list_type', 'tile');
			}
			this.togleIconVariant();
		},
		togleIconVariant: function(){
			if(MyLibrarryApp.request('filterState').get('list_type') === 'tile'){
				this.ui.goVariantListView.removeClass('glyphicon-th');
				this.ui.goVariantListView.addClass('glyphicon-th-list');
			} else{
				this.ui.goVariantListView.removeClass('glyphicon-th-list');
				this.ui.goVariantListView.addClass('glyphicon-th');
			}
		},

		setFilterAttribute: function(e){
			var attrFilter = $(e.target).html();
			myLibrarryApp.request('filterState').set('filter', attrFilter)
		},

		showFilter: function(){
			var self = this;
			var pluckOBJ = _.pluck(self.collection.toJSON(), 'genre');
			var filter = _.uniq(pluckOBJ);
			for(var i = 0; i<filter.length; i++){
				self.ui.genreContainer
					.append('<li><a class="filter-genre">'+filter[i]+'</a></li>');
			}
		},
	});

	listViews.BookListView = Backbone.Marionette.CompositeView.extend({
		tagName: 'table',
		className: 'table table-bordered',
		template: '#list-region-template',

		initialize: function(){
			this.listenTo(MyLibrarryApp.request('filterState'), 'change:filter', this.render, this);
		},

		childView: listViews.BookItemView,
		emptyView: listViews.NoChildView,

		ui: {
			goSort : '.go-sort'
		},
		events: {
			'click @ui.goSort' : "sortOperation",
		},

		sortOperation: function(e){
			var sortAttribute = $(e.target).html().toLowerCase()
			this.collection.goSort(sortAttribute);
		},

		addChild: function(childModel){
			var newFilter = MyLibrarryApp.request('filterState').get('filter');
			if(childModel.accordance(newFilter)){
				// стандартный метод прорисовки моделей
				Backbone.Marionette.CompositeView.prototype.addChild.apply(this, arguments);
			}
		},
	});

	listViews.mainLayoutView = Backbone.Marionette.LayoutView.extend({
		className: 'table-responsive',
		template: '#book-list-layout-template',

		regions:{
			listRegion: '#list-region',
			controlRegion: '#control-region',
		},
		initialize: function(){
			this.listenTo(MyLibrarryApp.request('filterState'), 'change:list_type', this.choiceVariant, this);
		},

		onShow: function(){
			this.choiceVariant();
			var controlListBooks = new MyLibrarryApp.listViews.ControlForList({
				collection: this.collection,
			});
			this.getRegion('controlRegion').show(controlListBooks);
		},

		choiceVariant: function(){
			if(MyLibrarryApp.request('filterState').get('list_type') === 'tile'){
				this.tileShow();
			} else{
				this.tableShow();
			}
		},

		tableShow: function(){
			var tableListBooks = new MyLibrarryApp.listViews.BookListView({
				collection: this.collection,
			});
			this.getRegion('listRegion').show(tableListBooks);
		},

		tileShow: function(){
			var tileListBooks = new MyLibrarryApp.TileListViews.BookListView({
				collection: this.collection,
			});
			this.getRegion('listRegion').show(tileListBooks);
		}
	});

})
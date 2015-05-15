/*global Backbone */
'use strict';

var listViews = myLibrarryApp.module('listViews', function(listViews, MyLibrarryApp, Backbone){

	listViews.BookItemView = Backbone.Marionette.ItemView.extend({
		tagName: 'tr',
		className: 'book-tr',
		template: '#book-template',
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
			genreContainer: '#filter-atributes-container'
		},

		onShow: function(){
			this.showFilter();
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

		childView: listViews.BookItemView,
		emptyView: listViews.NoChildView,
	});

	listViews.mainLayoutView = Backbone.Marionette.LayoutView.extend({
		className: 'table-responsive',
		template: '#book-list-layout-template',

		regions:{
			listRegion: '#list-region',
			controlRegion: '#control-region',
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
				console.log('show tile');
			} else{
				this.tableShow();
			}
		},

		tableShow: function(){
			var tableListBooks = new MyLibrarryApp.listViews.BookListView({
				collection: this.collection,
			});
			this.getRegion('listRegion').show(tableListBooks);
		}
	});

})
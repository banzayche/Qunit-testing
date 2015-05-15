/*global Backbone */
'use strict';

var modelCollection = myLibrarryApp.module('modelCollection', function(modelCollection, MyLibrarryApp, Backbone){

	modelCollection.Book = Backbone.Model.extend({
		defaults: {
			'title' : undefined,
			'author' : undefined,
			'year' : undefined,
			'description' : 'Not specefied',
			'genre' : undefined,
			'id' : undefined
		},

		urlRoot: '/api/books',
	});

	modelCollection.CollectionBook = Backbone.Collection.extend({
		model: modelCollection.Book,

		url: '/api/books',
	});

});
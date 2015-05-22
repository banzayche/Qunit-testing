$(function(){
	// test for model accordance
	var modelFunctionAccordance = new myLibrarryApp.modelCollection.Book({
											title : 1,
											author : 1,
											year : 1,
											description : 'Not specefied',
											genre : 1,
											id : 1
									});
	QUnit.test( "modelCollection.Book - testing function 'accordance'", function( assert ) {
	  assert.ok( modelFunctionAccordance.accordance('all') , "When we send 'all' - answer true" );
	  assert.ok( modelFunctionAccordance.accordance(1) , "When we send 1 - answer true" );
	  assert.notOk( modelFunctionAccordance.accordance(2), "When we send 2 - answer false" );
	});



//------------------------------------------------------------------------------
	// test for Edit view
	// for new model variant
	var modelsaveMethodStaticView = new myLibrarryApp.modelCollection.Book({
											title : 1,
											author : 1,
											year : 1,
											description : 'Not specefied',
											genre : 1,
											id : undefined
									});
	// for old model variant
	var modelsaveMethodStaticView2 = new myLibrarryApp.modelCollection.Book({
											title : 1,
											author : 1,
											year : 1,
											description : 'Not specefied',
											genre : 1,
											id : 1
									});
	var collectionForEditViewTest = new myLibrarryApp.modelCollection.CollectionBook([
		modelsaveMethodStaticView
    ]);
    // for new model variant    
	var saveMethodStaticView = new myLibrarryApp.staticViews.EditBookView({
											model: modelsaveMethodStaticView
									});
	// for old model variant
	var saveMethodStaticView2 = new myLibrarryApp.staticViews.EditBookView({
											model: modelsaveMethodStaticView2
									});
	QUnit.test( "staticViews.EditBookView - testing function 'goSave' ", function( assert ) {
	  assert.ok( saveMethodStaticView.goSave2(collectionForEditViewTest,1,2,2,2,2,true) === 'new', "return 'new' - 'new' model" );
	  assert.ok( saveMethodStaticView2.goSave2(collectionForEditViewTest,1,2,2,2,2,true) === 'old', "return 'old' - 'old' model" );
	  assert.ok( saveMethodStaticView.goSave2(collectionForEditViewTest,undefined,2,2,2,2,true) === 'empty', "return 'empty' - without 'title'" );
	  assert.ok( saveMethodStaticView.goSave2(collectionForEditViewTest,1,undefined,2,2,2,true) === 'empty', "return 'empty'  - without 'author'" );
	  assert.ok( saveMethodStaticView.goSave2(collectionForEditViewTest,1,2,undefined,2,2,true) === 'empty', "return 'empty'  - without 'genre'" );
	  assert.ok( saveMethodStaticView.goSave2(collectionForEditViewTest,1,2,2,undefined,2,true) === 'empty', "return 'empty'  - without 'year'" );
	});



// -----------------------------------------------------------------------
	// test for listViews.ControlForList
	var collectionForEditViewTest = new myLibrarryApp.modelCollection.CollectionBook([
		{
			title: 1,
			genre: 'genre-1'
		},
		{
			title: 2,
			genre: 'genre-2'
		},
		{
			title: 3,
			genre: 'genre-1'
		},
		{
			title: 4,
			genre: 'genre-2'
		},
		{
			title: 5,
			genre: 'genre-2'
		}
    ]);
	var newTestControlForList = new myLibrarryApp.listViews.ControlForList({
		collection: collectionForEditViewTest
	});

	QUnit.test( "listViews.ControlForList - testing function 'showFilter' ", function( assert ) {
	  assert.ok( newTestControlForList.showFilter(true) === 'test beginning: genre-1 genre-2', "Answer from function is true - 'test beginning: genre-1 genre-2'" );
	});



// -----------------------------------------------------------------------
	// test for routerController.GeneralController
	var generalControllerTest = new routerController.GeneralController();
	var generalRouterTest = new routerController.GeneralRouter({
		controller: generalControllerTest,
	});

	QUnit.test( "routerController.GeneralController - testing function 'control404_part2' ", function( assert ) {
	  assert.ok( generalControllerTest.control404_part2(1, 'edit', true) === '1-edit', "Answer from function is true - '1-edit'" );
	  assert.ok( generalControllerTest.control404_part2(1, 'detail', true) === '1-detail', "Answer from function is true - '1-detail'" );
	});
	QUnit.test( "routerController.GeneralController - testing function 'RouterProcessing' ", function( assert ) {
	  assert.ok( generalControllerTest.RouterProcessing('home', true) === 'header-footer+main', "Answer from function is true - 'header-footer+main'" );
	  assert.ok( generalControllerTest.RouterProcessing(0, true) === 'header-footer+404', "Answer from function is true - 'header-footer+404'" );
	  assert.ok( generalControllerTest.RouterProcessing('', true) === 'header-footer+404', "Answer from function is true - 'header-footer+404'" );
	});
});
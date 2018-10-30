<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/* Route::get('/', function(){
  $markerList = '<h1>Home</h1>';
  return $markerList;
}); */
/* Route::get('/', function () {
    return view('app');
}); */

Route::view('/{path?}', 'app');


/* Route::get('/page/{id}', function () {
  return '<h3>Hleeo</h3>';
    return view('app');
}); */


 Route::resource('/detail/{id}', 'DetailController');


//Route::resource('markers', 'MarkerController');

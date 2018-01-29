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

Route::get('/{url}', function () {
    return view('welcome');
})->where('url','[A-Za-z0-9\/-]*');

Route::get('/mongo', function(){
    // $users = DB::collection('users')->get();
    // $manager = new MongoDB\Driver\Manager();
    echo phpinfo();
    return "a";
});

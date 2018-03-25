<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Table;
use App\Events\TableOpenEvent;

class TableController extends Controller
{

    public function addForkTable($area, $table, Request $request)
    {
        $table = Table::where('area',$area)
        	->where('number',$table)
        	->get()
        	->first();
        $table->fork_title = $request->title;
        $table->save();
        event(new TableOpenEvent($table));
        return response()->json($table);
    }

    public function addBusyTable($area, $table)
    {
        $table = Table::where('area',$area)
        	->where('number',$table)
        	->get()
        	->first();
        if($table->is_busy==0){
        	$table->is_busy = 1;
        }else{
        	$table->is_busy = 0;
        }
        $table->save();
        event(new TableOpenEvent($table));        
        return response()->json($table);
    }

    public function cancelBusyTable($area, $table)
    {

    }

    public function getTablesByAreq($area){
        $tables = Table::where('area',$area)
            ->orderBy('number')
            ->get();
            return response()->json($tables);
    }

    public function tableOpen($area, $table)
    {
        $table = Table::where('area',$area)
        	->where('number',$table)
        	->get()
        	->first();
        if($table->is_open==0){
        	$table->is_open = 1;
        }else{
        	$table->is_open = 0;
        }
        $table->save();

        event(new TableOpenEvent($table));

        return response()->json($table);

    }
}

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBusyColumToTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tables', function($table) {
            $table->smallInteger('is_busy')->nullable();
            $table->string('fork_title')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tables', function($table) {
            $table->dropColumn('is_busy');
            $table->dropColumn('fork_title');
        });
    }
}

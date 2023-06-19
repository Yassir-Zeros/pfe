<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gestions', function (Blueprint $table) {
            $table->id();
            $table->String("employe")->nullable();
            $table->String("intérêt")->nullable();
            $table->String("ubrique_envoyée")->nullable();
            $table->String("destinataire")->nullable();
            $table->String("sujet")->nullable();
            $table->String("date")->default(now());
            $table->String("type_courriel")->nullable();
            $table->String("datec")->nullable();
            $table->String("datep")->nullable();
            $table->String("type")->nullable();
            $table->String("status")->default("0");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gestions');
    }
}

@extends('layouts.app')




    @if(count($pages) > 0)


      @foreach($pages as $page)
          {{$page->name_en}}
      @endforeach


    @endif

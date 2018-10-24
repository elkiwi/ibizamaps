@extends('layouts.app')

  @section('content')
    <h3>Pages</h3>

    @if(count($pages) > 0)
      @foreach($pages as $page)

        <ul class="list">
          <li class="item">{{$page->name_en}}</li>
        </div>

      @endforeach
    @endif
  @endsection
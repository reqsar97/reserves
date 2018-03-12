<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Dargett reserves</title>
        <link rel="shortcut icon" type="image/png" href="/img/Logo-1.png"/>
        <link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
        <style>
            body > #root,
            body > #root> div {
                height: 100%;
            }
        </style>
    </head>
    <body>
        <div id="root"></div>
        <script src="{{asset('js/app.js')}}" ></script>
    </body>
</html>

<?php
try {
    $dbh = new PDO('mysql:host=localhost;dbname=ekollive', 'homestead','secret');
    $dbh->exec("SET NAMES 'utf8'; SET CHARSET 'utf8'");

} catch (PDOException $e) {
    print "Hata!: " . $e->getMessage() . "<br/>";
    die();
}


header('Content-Type: text/html; charset=utf-8');
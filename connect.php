<?php
try {
    $dbh = new PDO('mysql:host=localhost;dbname=ekollive', 'homestead','secret');



} catch (PDOException $e) {
    print "Hata!: " . $e->getMessage() . "<br/>";
    die();
}
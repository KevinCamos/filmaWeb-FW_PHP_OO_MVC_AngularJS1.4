<?php
function console_log($data) 
{
    echo '<script>';
    echo 'console.log(' . json_encode($data) . ')';
    echo '</script>';
}

echo '<script> alert("Connected successfully")</script>';

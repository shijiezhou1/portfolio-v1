<?php

class Search
{
    private $document = array();

    public function __construct()
    {

    }

    /**
     * @param array $document
     */
    public function setDocument($document)
    {
        $this->document = $document;
    }

    /**
     * @return array
     */
    public function getDocument()
    {
        return $this->document;
    }

    public function fetchURL()
    {
        // create a new cURL resource
    $ch = curl_init();

    // set URL and other appropriate options
    curl_setopt($ch, CURLOPT_URL, "https://www.jetbrains.com/help/phpstorm/reformat-file-dialog.html");
    curl_setopt($ch, CURLOPT_HEADER, 0);

    // grab URL and pass it to the browser
    curl_exec($ch);

    // close cURL resource, and free up system resources
    curl_close($ch);
    }

    function get_xml_from_url($url){
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');

        $xmlstr = curl_exec($ch);
        curl_close($ch);

        return $xmlstr;
    }
}
//
//$search =  new Search();
//$search = $search->get_xml_from_url("https://alistapart.com/d/usingxml/xml_uses_a.html");
//$search = $search->fetchURL();
//print_r($search);
//$url = "https://alistapart.com/d/usingxml/xml_uses_a.html";
//$xml = simplexml_load_file($url);
//print_r($xml);




$handle = curl_init();

$url = "https://www.baidu.com";

// Set the url
curl_setopt($handle, CURLOPT_URL, $url);
// Set the result output to be a string.
curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);

$output = curl_exec($handle);

curl_close($handle);

echo $output;
?>
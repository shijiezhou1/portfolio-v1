<h2>
<?php
// Assuming the above tags are at www.example.com
$tags = get_meta_tags('http://www.spotlighthometours.com/tours/video-player-j.php?type=video&autoPlay=true&id=3054590');
//$tags2 = get_meta_tags('https://learn.freecodecamp.org/responsive-web-design/responsive-web-design-projects/build-a-technical-documentation-page');

// Notice how the keys are all lowercase now, and
// how . was replaced by _ in the key.
print_r($tags);
// echo json_encode($tags);
// echo $tags['author'];       // name
// echo $tags['keywords'];     // php documentation
// echo $tags['description'];  // a php manual
// echo $tags['geo_position']; // 49.33;-86.59
?>
</h2>
// JavaScript Document
var userType = 'admin';
var userID = 0;
var myContentOnly = false;
$(".my-content").on("click", function(){
	if(myContentOnly){
		myContentOnly = false;
		$(".my-content").html('<i class="glyphicon glyphicon-eye-open"></i> My Content');
	}else{
		myContentOnly = true;
		$(".my-content").html('<i class="glyphicon glyphicon-eye-open"></i> All Content');
	}
	getCategoris();
});
/* CATEGORIES */
var categories = [];
function getCategoris(){
	ajaxMessage('Loading Categories...', 'processing');
	$.ajax({
	  method: "POST",
	  url: "../../repository_queries/socialcategories.php",
	  dataType: 'json',
	  data: { action: 'get', userType: userType, userID: userID, userContentOnly: myContentOnly }
	}).done(function( response ) {
		categories = response;
		refreshCategories();
		ajaxMessage('Categories Loaded!', 'success');
		getContent();
	});
}
var waitSubCats = [];
var addingCatFromSelect = false;
function generateCatMenus(){
	waitSubCats = [];
	$('.cat-man-menu .dropdown-menu').html('');
	$('.cat-cont-menu .dropdown-menu').html('');
	if(!addingCatFromSelect){
		$('.select-categories').html('');
	}
	$('.cat-man-menu .dropdown-menu').append('<li><a href="javascript:" data-toggle="modal" data-target="#cCatModal"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> <span style="display:none;">0</span>Add Category</a></li>');
	$.each(categories, function(k, v) {
		if(!addingCatFromSelect){
			$('.select-categories').append($("<option></option>").attr("value",v.id).text(v.name));
		}
		var parentIDs = v.parentID.split(",");
		$.each(parentIDs, function(pk, pv) {
			pv = parseInt(pv);
			if(pv>0){
				appendSubCat(k, v, pv);
			}else{
				if(isEditable(v.userID, v.userType)){
					$('.cat-man-menu > .dropdown-menu').append('<li id="cat'+v.id+'"><a href="javascript:editCategory('+v.id+')"><span class="glyphicon glyphicon-pencil"></span> '+v.name+' ('+v.count+') <i class="glyphicon glyphicon-user"></i> '+v.members+'</a></li>');	
				}else{
					$('.cat-man-menu > .dropdown-menu').append('<li id="cat'+v.id+'"><a href="javascript:">'+v.name+' ('+v.count+') <i class="glyphicon glyphicon-user"></i> '+v.members+'</a></li>');
				}
				$('.cat-cont-menu > .dropdown-menu').append('<li id="cat'+v.id+'"><a href="javascript:" class="update">'+v.name+' ('+v.count+') <i class="glyphicon glyphicon-user"></i> '+v.members+'</a></li>');
			}
		});
	});
	$.each(waitSubCats, function(k, v) {
		var parentIDs = v.parentID.split(",");
		$.each(parentIDs, function(pk, pv) {
			appendSubCat(k, v, pv);
		});
	});
	$('.cat-cont-menu .cat-cont-men').append('<li><a href="#" data-toggle="modal" data-target="#cCatModal"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> <span style="display:none;">0</span>Add Category</a></li>');
	if(!addingCatFromSelect){
		$(".select-categories").select2({
    		tags: true,
    		tokenSeparators: [","]
		}).on("change", function(e) {
			var isNew = $(this).find('[data-select2-tag="true"]');
			if(isNew.length){
				var newID = (parseInt(categories.length)+1);
				isNew.replaceWith('<option selected value="'+newID+'">'+isNew.val()+'</option>');
				var saveCategory = confirm('Save: "'+isNew.val()+'" as a new category?');
				if (saveCategory == true) {
					addingCatFromSelect = true;
					var catID = addCategory(isNew.val(), ["0"], 0, newID);
				}else{
					$(".select-categories option[value='"+newID+"']").remove();
					// remove the li node at first 
				   	$(".select-categories").next(".select2").find("li[title='"+isNew.val()+"']").remove();
				   	// set the select with value A to unselected
				   	$(".select-categories").find("option[value='"+newID+"']").prop("selected",false);
				}
			}
		});
	}
	addingCatFromSelect = false;
	$(".cat-cont-menu .dropdown-menu").off('click', 'li a').on('click', 'li a', function(){
		$(".cat-cont-menu .btn:first-child").html($(this).text()+' &nbsp;<span class="caret"></span>');
		$(".cat-cont-menu .btn:first-child").val($(this).text());
		if(!$(".cat-cont-menu li#cat0").length){
			$(".cat-cont-men").append('<li id="cat0"><a class="update" href="javascript:">All Categories</a></li>');
		}
		getContentByCat([$(this).parent().attr('id').replace("cat","")]);
	});
}

function appendSubCat(k, v, parentID){
	if($('.cat-man-menu .dropdown-menu #cat'+parentID+' ul').length){
		if($('.cat-man-menu .dropdown-menu #cat'+parentID+' > ul > #cat'+v.id).length){
		}else{
			if(isEditable(v.userID, v.userType)){
				$('.cat-man-menu .dropdown-menu #cat'+parentID+' > ul').append('<li id="cat'+v.id+'"><a href="javascript:editCategory('+v.id+')"><span class="glyphicon glyphicon-pencil"></span> '+v.name+' ('+v.count+') <i class="glyphicon glyphicon-user"></i> '+v.members+'</a></li>');
			}else{
				$('.cat-man-menu .dropdown-menu #cat'+parentID+' > ul').append('<li id="cat'+v.id+'"><a href="javascript:">'+v.name+' ('+v.count+') <i class="glyphicon glyphicon-user"></i> '+v.members+'</a></li>');
			}
			$('.cat-cont-menu .dropdown-menu #cat'+parentID+' > ul').append('<li id="cat'+v.id+'"><a href="javascript:" class="update">'+v.name+' ('+v.count+') <i class="glyphicon glyphicon-user"></i> '+v.members+'</a></li>');
		}
	}else{
		if($('.cat-man-menu .dropdown-menu #cat'+parentID).length){
			if($('.cat-man-menu .dropdown-menu #cat'+parentID+' > ul > #cat'+v.id).length){
			}else{
				$('.cat-man-menu .dropdown-menu #cat'+parentID).append('<ul class="dropdown-menu"></ul>');
				$('.cat-man-menu .dropdown-menu #cat'+parentID).attr('class', 'dropdown-submenu');
				if(isEditable(v.userID, v.userType)){
					$('.cat-man-menu .dropdown-menu #cat'+parentID+' ul').append('<li id="cat'+v.id+'"><a href="javascript:editCategory('+v.id+')"><span class="glyphicon glyphicon-pencil"></span> '+v.name+' ('+v.count+') <i class="glyphicon glyphicon-user"></i> '+v.members+'</a></li>');
				}else{
					$('.cat-man-menu .dropdown-menu #cat'+parentID+' ul').append('<li id="cat'+v.id+'"><a href="javascript:">'+v.name+' ('+v.count+') <i class="glyphicon glyphicon-user"></i> '+v.members+'</a></li>');	
				}
				$('.cat-cont-menu .dropdown-menu #cat'+parentID).append('<ul class="dropdown-menu"></ul>');
				$('.cat-cont-menu .dropdown-menu #cat'+parentID).attr('class', 'dropdown-submenu');
				$('.cat-cont-menu .dropdown-menu #cat'+parentID+' ul').append('<li id="cat'+v.id+'"><a href="javascript:" class="update">'+v.name+' ('+v.count+') <i class="glyphicon glyphicon-user"></i> '+v.members+'</a></li>');
			}
		}else{
			waitSubCats.push(v);
		}		
	}
}

function refreshCategories(){
	generateCatMenus();
	sortCategories();
}

function getCategoryIndex(id){
	var catIndex = 0;
	$.each(categories, function(k, v) {
		if(v.id==id){
			catIndex = k;
		}
	});
	return catIndex;
}

function getCategoryVals(id){
	var values = {};
	$.each(categories, function(k, v) {
		if(v.id==id){
			values = v;
		}
	});
	return values;
}

function setCategoryVal(id, index, val){
	var values = getCategoryVals(id);
	values[index] = val;
	categories.splice(getCategoryIndex(id), 1, values);
}

function deleteCategory(id){
	ajaxMessage('Deleting Category...', 'processing');
	$.ajax({
	  method: "POST",
	  url: "../../repository_queries/socialcategories.php",
	  dataType: 'json',
	  data: { action: 'delete', id: id, userType: userType, userID: userID }
	}).done(function( response ) {
		categories.splice(getCategoryIndex(id), 1);
		refreshCategories();
		ajaxMessage('Category Deleted!', 'success');
	});
}

function sortCategories(){
	$('.cat-cont-menu ul, .cat-man-menu ul').each(function(){
    	var mylist = $(this);
		var listitems = $('> li', mylist).get();
		listitems.sort(function(a, b) {
			var compA = $(a).text().toUpperCase();
			var compB = $(b).text().toUpperCase();
			return (compA < compB) ? -1 : 1;
		});
		$.each(listitems, function(i, itm) {
			mylist.append(itm);
		});
	});
	if(!addingCatFromSelect){
		$('.select-categories').each(function(){
			var mylist = $(this);
			var listitems = $('option', mylist).get();
			listitems.sort(function(a, b) {
				var compA = $(a).text().toUpperCase();
				var compB = $(b).text().toUpperCase();
				return (compA < compB) ? -1 : 1;
			});
			$.each(listitems, function(i, itm) {
				mylist.append(itm);
			});
		});
	}
}

function addCategory(name, parentID, hidden, updateCatID=0, membershipID=0, pinterest=0){
	ajaxMessage('Creating Category...', 'processing');
	if(parentID){
		
	}else{
		parentID = ["0"];
	}
	$.ajax({
	  method: "POST",
	  url: "../../repository_queries/socialcategories.php",
	  dataType: 'json',
	  data: { action: 'create', name: name, parentID: parentID, hidden: hidden, membershipID: membershipID, userType: userType, userID: userID, pinterest:pinterest }
	}).done(function( response ) {
		getCategoris();
		ajaxMessage('Category Created!', 'success');
		if(updateCatID>0){
			$(".select-categories option[value='"+updateCatID+"']").val(response.id).attr('value', response.id);
			$(".select-categories").trigger('change');
		}
		return response.id;
	});
}

function createCategory(){
	var categoryName = $("#cCatModal input[name='catName']").val();
	var parentIDs = $("#cCatModal #catParent").val();
	if(parentIDs){
		
	}else{
		parentIDs = ["0"];
	}
	var hidden = 0;
	if($("#cCatModal input[name='catHidden']").prop('checked') == true){
   		hidden = 1;
	}
	var membershipID = 0;
	if($("#cCatModal input[name='catPlatinum']").prop('checked') == true){
   		membershipID = 23;
	}
	pinterest = 0;
	if($("#cCatModal input[name='catPinterest']").prop('checked') == true){
   		pinterest = 1;
	}
	addCategory(categoryName, parentIDs.join(), hidden, 0, membershipID, pinterest);
	$('#cCatModal').modal('toggle');
}

function editCategory(id){
	$('#eCatModal').modal({});
	$("#eCatModal input[name='catHidden']").prop('checked', false);
	$("#eCatModal input[name='catPlatinum']").prop('checked', false);
	$("#eCatModal input[name='catPinterest']").prop('checked', false);
	var categoryVals = getCategoryVals(id);
	$('#eCatModal input[name="catName"]').val(categoryVals.name);
	var selectedValues = categoryVals.parentID.split(',');
	$("#eCatModal #catParent").val(selectedValues).trigger('change');
	if(categoryVals.hidden=="1"){
		$("#eCatModal input[name='catHidden']").prop('checked', true);
	}
	if(categoryVals.membershipID=="23"){
		$("#eCatModal input[name='catPlatinum']").prop('checked', true);
	}
	if(categoryVals.pinterest=="1"){
		$("#eCatModal input[name='catPinterest']").prop('checked', true);
	}
	$('#eCatModal .modal-footer .btn-danger').off('click').on('click', function(){
		deleteCategory(id);
		$('#eCatModal').modal('hide');
	});
	$('#eCatModal .modal-footer .btn-primary').off('click').on('click', function(){
		saveCategory(id);
		$('#eCatModal').modal('hide');
	});
	
}

function saveCategory(id){
	var catName = $('#eCatModal input[name="catName"]').val();
	var parentIDs = $("#eCatModal #catParent").val();
	if(parentIDs){
		
	}else{
		parentIDs = ["0"];
	}
	var hidden = "0";
	if($("#eCatModal input[name='catHidden']").prop('checked') == true){
   		hidden = "1";
	}
	var membershipID = 0;
	if($("#eCatModal input[name='catPlatinum']").prop('checked') == true){
   		membershipID = "23";
	}
	var pinterest = 0;
	if($("#eCatModal input[name='catPinterest']").prop('checked') == true){
   		pinterest = "1";
	}
	ajaxMessage('Saving Category...', 'processing');
	$.ajax({
	  method: "POST",
	  url: "../../repository_queries/socialcategories.php",
	  dataType: 'json',
	  data: { action: 'update', name: catName, id: id, parentID: parentIDs.join(), hidden: hidden, membershipID: membershipID, userType: userType, userID: userID, pinterest: pinterest }
	}).done(function( response ) {
		setCategoryVal(id, 'name', catName);
		setCategoryVal(id, 'parentID', parentIDs.join());
		setCategoryVal(id, 'hidden', hidden);
		setCategoryVal(id, 'membershipID', membershipID);
		setCategoryVal(id, 'pinterest', pinterest);
		refreshCategories();
		ajaxMessage('Category Saved!', 'success');
	});
}

/* CREATE CONTENT */
var postData = {};
var contentID = 0;
$(".post-actions .uploadImg").on('click', function(){
	$("#imgFileSelect").val('');
	$("#imgFileSelect").trigger('click');
});
$("#imgFileSelect").change(function(){
    var response = {};
	var input = this;
	postData.image = this;
	var reader = new FileReader();
    reader.onload = function (e) {
    	response.cover = e.target.result;
		response.title = '';
		response.description = '';
		response.domain = '';
		var newPostContent = $('#newPostContent').val();
		postData.caption = newPostContent;
		generatePreview(response);
    };
    reader.readAsDataURL(input.files[0]);
});

$(".post-actions .uploadVid").on('click', function(){
	$("#vidFileSelect").val('');
	$("#vidFileSelect").trigger('click');
});
$("#vidFileSelect").change(function(){
    var response = {};
	var input = this;
	postData.video = this;
	response.vidName = input.files[0].name;
	response.vidURL = URL.createObjectURL(input.files[0]);
	response.vidType = input.files[0].type;
	response.title = '';
	response.description = '';
	response.domain = '';
	var newPostContent = $('#newPostContent').val();
	postData.caption = newPostContent;
	generatePreview(response);
});
function createContentSetNetworkType(){
	$("#cContentModal .content-preview .network-type a").hide();
	$.each(postData.networkType, function(index, networkType) {
		$("#cContentModal .content-preview .network-type .btn-"+networkType).show();
		setCNetwork(networkType);
	});
}
function showCreateContentModal(){
	$('#cContentModal').modal({});
	$('#cContentModal select[name="networkType"]').off("change").on("change", function(){
		postData.networkType = $(this).val();
		if(postData.networkType!=="all"){
			createContentSetNetworkType();
		}
	});
	$('#contentSchedule').datetimepicker({
		inline: true,
		sideBySide: true
	});
	$('#contentScheduleFrom').datetimepicker();
    $('#contentScheduleTo').datetimepicker({
    	useCurrent: false //Important! See issue #1075
    });
	postData.userType = userType;
	postData.userID = userID;
	$("#contentSchedule").on("dp.change", function (e) {
    	if(e.date){
			postData.scheduledOn = $(this).data("DateTimePicker").date().format("YYYY-MM-DD HH:mm:ss");
		}
    });
    $("#contentScheduleFrom").on("dp.change", function (e) {
    	if(e.date){
			postData.scheduleFrom = $(this).data("DateTimePicker").date().format("YYYY-MM-DD HH:mm:ss");
		}
		$('#contentScheduleTo').data("DateTimePicker").minDate(e.date);
    });
    $("#contentScheduleTo").on("dp.change", function (e) {
    	if(e.date){
			postData.scheduleTo = $(this).data("DateTimePicker").date().format("YYYY-MM-DD HH:mm:ss");
		}
		$('#contentScheduleFrom').data("DateTimePicker").maxDate(e.date);
    });
	$('#cContentModal .select-categories').on("change", function(){
		postData.categories = $(this).val();
	});
	resetContentModal();
	$('.selectmulti').selectpicker({
  		showContent: false
	});
	$('.selectmulti').selectpicker('val', ["all"]);
	$('#cContentModal input[name="scheduleYear"]').on("change", function(){
		postData.scheduleYear = 1;
		if($(this).is(":checked")){
			postData.scheduleYear = 0;
		}
	});
	$('#cContentModal input[name="scheduleFrameYear"]').on("change", function(){
		postData.scheduleFrameYear = 1;
		if($(this).is(":checked")){
			postData.scheduleFrameYear = 0;
		}
	});
}
function resetContentModal(){
	postData = {
		previewurl: "",
		previewtitle: "",
		previewcover: "",
		previewdomain: "",
		previewdesc: "",
		previewtype: "",
		image: "0",
		video: "0",
		scheduledOn: "",
		scheduleYear: 0,
		scheduleFrom: "",
		scheduleFrameYear: 0,
		scheduleTo: "",
		categories: "",
		content: "",
		caption: "",
		networkType: "all",
		userType: userType,
		userID: userID
	};
	$('#cContentModal input[name="scheduleYear"]').prop('checked', true);
	$('#cContentModal input[name="scheduleFrameYear"]').prop('checked', true);
	$("#contentScheduleTo").data("DateTimePicker").clear();
	$("#contentScheduleFrom").data("DateTimePicker").clear();
	$("#contentSchedule").data("DateTimePicker").clear();
	$('#newPostContent').val("");
	$('#cContentModal .select-categories').val("").trigger('change');
	showNoDate();
	showContentPreview();
	$("#cContentModal .content-preview .preview").css('display', 'none');
	$(".content-preview .alert").css('display', 'block');
	$(".content-preview .alert").html("<strong>Preview will load here:</strong> Once you upload media or enter a URL into the content textarea above.");
}
function showEditContentModal(){
	$('#cContentModal').modal({});
	$('#cContentModal select[name="networkType"]').off("change").on("change", function(){
		postData.networkType = $(this).val();
		if(postData.networkType!=="all"){
			createContentSetNetworkType();
		}
	});
	$('#contentSchedule').datetimepicker({
		inline: true,
		sideBySide: true,
		format: "YYYY-MM-DD HH:mm:ss"
	});
	$('#contentScheduleFrom').datetimepicker({
		format: "YYYY-MM-DD HH:mm:ss"
	});
    $('#contentScheduleTo').datetimepicker({
    	useCurrent: false, //Important! See issue #1075
		format: "YYYY-MM-DD HH:mm:ss"
    });
	$("#contentSchedule").on("dp.change", function (e) {
    	if(e.date){
			postData.scheduledOn = $(this).data("DateTimePicker").date().format("YYYY-MM-DD HH:mm:ss");
		}
    });
    $("#contentScheduleFrom").on("dp.change", function (e) {
    	if(e.date){
			postData.scheduleFrom = $(this).data("DateTimePicker").date().format("YYYY-MM-DD HH:mm:ss");
		}
		$('#contentScheduleTo').data("DateTimePicker").minDate(e.date);
    });
    $("#contentScheduleTo").on("dp.change", function (e) {
    	if(e.date){
			postData.scheduleTo = $(this).data("DateTimePicker").date().format("YYYY-MM-DD HH:mm:ss");
		}
		$('#contentScheduleFrom').data("DateTimePicker").maxDate(e.date);
    });
	$('#cContentModal .select-categories').on("change", function(){
		postData.categories = $(this).val();
	});
	$("#contentScheduleTo").data("DateTimePicker").date(postData.scheduleTo);
	$("#contentScheduleFrom").data("DateTimePicker").date(postData.scheduleFrom);
	$("#contentSchedule").data("DateTimePicker").date(postData.scheduledOn);
	$('#newPostContent').val(postData.content);
	$('#newPostContent').trigger('blur');
	$('#cContentModal .select-categories').val(postData.categories.split(',')).trigger("change");
	if(postData.scheduleFrom){
		if(postData.scheduleFrameYear=="1"){
			$('#cContentModal input[name="scheduleFrameYear"]').prop('checked', false);
		}else{
			$('#cContentModal input[name="scheduleFrameYear"]').prop('checked', true);
		}
		showDateRange();
	}else if(postData.scheduledOn){
		if(postData.scheduleYear=="1"){
			$('#cContentModal input[name="scheduleYear"]').prop('checked', false);
		}else{
			$('#cContentModal input[name="scheduleYear"]').prop('checked', true);
		}
		showExactDate();
	}else{
		showNoDate();
	}
	$('#cContentModal input[name="scheduleYear"]').on("change", function(){
		postData.scheduleYear = 1;
		if($(this).is(":checked")){
			postData.scheduleYear = 0;
		}
	});
	$('#cContentModal input[name="scheduleFrameYear"]').on("change", function(){
		postData.scheduleFrameYear = 1;
		if($(this).is(":checked")){
			postData.scheduleFrameYear = 0;
		}
	});
	showContentPreview();
	$('.selectmulti').selectpicker({
  		showContent: false
	});
	$('.selectmulti').selectpicker('val', postData.networkType.split(","));
}
function saveContent(){
	debugger
	if(postData.image && typeof postData.image === 'object'){
		// There is an image selected for upload
		ajaxMessage('Uploading image for this content...', 'processing');
		var file = postData.image.files[0];
		postData.image = "1";
    	var upload = new Upload(file);
    	upload.doUpload();
	}else if(postData.video && typeof postData.video === 'object'){
		// There is a video selected for upload
		ajaxMessage('Uploading video for this content...', 'processing');
		var file = postData.video.files[0];
		postData.video = "1";
    	var upload = new Upload(file);
    	upload.doUpload();
	}else{
		ajaxMessage('Saving content data...', 'processing');
		insertContentData();
	}
}
function insertContentData(){
	debugger
	if($.isArray(postData.networkType)){
		postData.networkType = postData.networkType.join();
	}else{
		postData.networkType = postData.networkType;
	}
	if(postData.id){
		$.ajax({
		  method: "POST",
		  url: "../../repository_queries/socialcontent-save-content.php",
		  dataType: 'json',
		  data: postData
		}).done(function( response ) {
			contentID = response.contentID;
			ajaxMessage('Content data saved!', 'success');
			$('#cContentModal').modal('toggle');
			getContent();
		});
	}else{
		$.ajax({
		  method: "POST",
		  url: "../../repository_queries/socialcontent-save-content.php",
		  dataType: 'json',
		  data: postData
		}).done(function( response ) {
			contentID = response.contentID;
			ajaxMessage('Content data saved!', 'success');
			$('#cContentModal').modal('toggle');
			getContent();
		});
	}
}
function showExactDate(){
	$(".schedule .no-date").slideUp('slow');
	$(".schedule .date-range").slideUp('slow', function(){
		$(".schedule .exact-date").slideDown('slow');
	});
	$(".exact-date-btn").addClass('active');
	$(".date-range-btn").removeClass('active');
	$(".no-date-btn").removeClass('active');
}

function showDateRange(){
	$(".schedule .no-date").slideUp('slow');
	$(".schedule .exact-date").slideUp('slow', function(){
		$(".schedule .date-range").slideDown('slow');
	});
	$(".exact-date-btn").removeClass('active');
	$(".date-range-btn").addClass('active');
	$(".no-date-btn").removeClass('active');
}

function showNoDate(){
	$(".schedule .exact-date").slideUp('slow');
	$(".schedule .date-range").slideUp('slow');
	$(".schedule .no-date").slideDown('slow');
	$(".exact-date-btn").removeClass('active');
	$(".date-range-btn").removeClass('active');
	$(".no-date-btn").addClass('active');
}

function showContentPreview(){
	if($("#cContentModal .content-preview").is(":visible")){
		
	}else{
		$("#cContentModal .schedule").slideUp('slow', function(){
			$("#cContentModal .content-preview").slideDown('slow');
		});
		$(".content-preview-btn").addClass('active');
		$(".schedule-btn").removeClass('active');
	}
}

function showSchedule(){
	$("#cContentModal .content-preview").slideUp('slow', function(){
		$("#cContentModal .schedule").slideDown('slow');
	});
	$(".content-preview-btn").removeClass('active');
	$(".schedule-btn").addClass('active');
}

var text_max = 64000;
var twitter_max = 140;
var pinterest_max = 500;
var linkedin_max = 600;
var instagram_max = 2200;
$('#count_message').html('0 / ' + text_max );
$('#newPostContent').keyup(function(e) {
  	var text_length = postData.caption.length;
  	var text_remaining = text_max - text_length;
 	 $('#count_message').html(text_length + ' / ' + text_max);
	genCaption();
	if(text_length>twitter_max){
		$('#cContentModal .content-input .alert').html('<strong>Twitter character limit reached:</strong> Please note this content will be cut off after '+twitter_max+' characters for twitter.');
		$('#cContentModal .content-input .alert').fadeIn('slow');
	}else{
		$('#cContentModal .content-input .alert').fadeOut('slow');
	}
	if(text_length>pinterest_max){
		$('#cContentModal .content-input .alert').html('<strong>Pinterest and Twitter character limit reached:</strong> Please note this content will be cut off after '+pinterest_max+' characters for Pinterest and '+twitter_max+' for Twitter.');
		$('#cContentModal .content-input .alert').fadeIn('slow');
	}else if(text_length>twitter_max){
		$('#cContentModal .content-input .alert').html('<strong>Twitter character limit reached:</strong> Please note this content will be cut off after '+twitter_max+' characters for twitter.');
	}
	if(text_length>linkedin_max){
		$('#cContentModal .content-input .alert').html('<strong>Linkedin, Pinterest and Twitter character limit reached:</strong> Please note this content will be cut off after '+linkedin_max+' characters for Linkedin, '+pinterest_max+' characters for Pinterest and '+twitter_max+' for Twitter.');
	}else if(text_length>pinterest_max){
		$('#cContentModal .content-input .alert').html('<strong>Pinterest and Twitter character limit reached:</strong> Please note this content will be cut off after '+pinterest_max+' characters for Pinterest and '+twitter_max+' for Twitter.');
	}
	if(text_length>instagram_max){
		$('#cContentModal .content-input .alert').html('<strong>Instagram, Linkedin, Pinterest and Twitter character limit reached:</strong> Please note this content will be cut off after '+instagram_max+' for Instagram, '+linkedin_max+' characters for Linkedin, '+pinterest_max+' characters for Pinterest and '+twitter_max+' for Twitter.');
	}else if(text_length>linkedin_max){
		$('#cContentModal .content-input .alert').html('<strong>Linkedin, Pinterest and Twitter character limit reached:</strong> Please note this content will be cut off after '+linkedin_max+' characters for Linkedin, '+pinterest_max+' characters for Pinterest and '+twitter_max+' for Twitter.');
	}
	if ( e.keyCode !== 8 && e.keyCode !== 9 && e.keyCode !== 13 && e.keyCode !== 32 && e.keyCode !== 46 ) {
    	// Return is backspace, tab, enter, space or delete was not pressed.
        return;
    }
	var urls = getURLS($(this).val());
	if(urls&&urls.length>0){
		getPreview(urls[urls.length-1]);
	}
});

$('#newPostContent').on('blur', function(){
	var urls = getURLS($(this).val());
	if(urls&&urls.length>0){
		getPreview(urls[urls.length-1]);
	}
});

function getCNetworkCaption(network){
	var max_text = 64000;
	switch(network) {
		case "twitter":
			max_text = twitter_max;
		break;
		case "pinterest":
			max_text = pinterest_max;
		break;
		case "linkedin":
			max_text = linkedin_max;
		break;
		case "instagram":
			max_text = instagram_max;
		break;	
	}
	var fullCaption = $(".content-preview .preview .caption").attr('data-text');
	if(fullCaption){
		return fullCaption.substr(0, max_text);
	}
}

function getPreview(url){
	postData.previewurl = url;
	ajaxMessage('Loading Content Preview...', 'processing');
	$(".content-preview .alert").css('display', 'block');
	$(".content-preview .alert").html("Loading Preview...");
	$.ajax({
	  method: "POST",
	  url: "../../repository_queries/socialcontent-get-preview.php",
	  dataType: 'json',
	  data: { url: url }
	}).done(function( response ) {
		if(response.title){
			ajaxMessage('Content Preview Loaded!', 'success');
			generatePreview(response);
			genCaption();
			postData.image = "0";
		}
	});
}

function genCaption(){
	var newPostContent = $('#newPostContent').val();
	postData.content = newPostContent;
	postData.caption = newPostContent.replace(postData.previewurl, "");
	$(".content-preview .preview .caption").html(postData.caption);
	$(".content-preview .preview .caption").attr('data-text', postData.caption);
}

function generatePreview(previewObj){
	$(".content-preview .alert").css('display', 'none');
	postData.previewtitle = previewObj.title;
	postData.previewdesc = previewObj.description;
	if(previewObj.cover){
		postData.previewcover = previewObj.cover;
	}else{
		postData.previewcover = previewObj.images[1];
	}
	postData.previewdomain = previewObj.domain;
	$(".content-preview .preview h2").html(postData.previewtitle);
	$(".content-preview .preview p").html(postData.previewdesc);
	$(".content-preview .preview img").attr('src', postData.previewcover);
	$(".content-preview .preview").slideDown('slow');
	$("#cContentModal .network-type").fadeIn('slow');
	$(".content-preview .preview a").html(postData.previewdomain);
	if(previewObj.videoType){
		$(".content-preview .preview").addClass('video');
		postData.previewtype = 'video';
	}else{
		$(".content-preview .preview").removeClass('video');
		postData.previewtype = 'article';
	}
	if(postData.previewtitle.length>2){
		
	}else{
		postData.previewtype = 'image';
	}
	if(previewObj.vidURL){
		$("#cContentVideoPreview").css('display', 'block');
		var myPlayer = videojs('cContentVideoPreview').ready(function () {
            // ready
            var fileUrl = previewObj.vidURL;
            var fileType = previewObj.vidType;
            this.src({ type: fileType, src: fileUrl });
            this.load();
            //this.play();
			postData.previewtype = 'video';
        });
		$(".content-preview .preview img").hide();
		$(".content-preview .preview video, .content-preview .preview .video-js").show();
	}else{
		postData.video = "0";
		$(".content-preview .preview img").show();
		$(".content-preview .preview video, .content-preview .preview .video-js").hide();
	}
	showContentPreview();
}

function getURLS(theText){
	var geturl = new RegExp("(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))","g");
	return theText.match(geturl);
}

/* NETWORK TYPE */
var networkType = 'facebook';
function setNetwork(network){
	$(".container .btn-"+networkType).removeClass('active');
	$(".container .btn-"+network).addClass('active');
	$(".saved-content .panel").each(function () {
		var networkonly = $(this).data('networkonly');
		if(networkonly){
			var allowedNetworks = networkonly.split(",");
			if(jQuery.inArray(network, allowedNetworks)>-1){
				$(this).removeClass("facebook twitter linkedin instagram pinterest").addClass(network);
			}else{
				$(this).find(".btn-"+allowedNetworks[allowedNetworks.length-1]).addClass('active');
			}
		}else{
			$(this).removeClass("facebook twitter linkedin instagram pinterest").addClass(network);
		}
	});
	networkType = network;
}
var cNetworkType = 'facebook';
function setCNetwork(network){
	$("#cContentModal .preview").removeClass("facebook twitter linkedin instagram pinterest").addClass(network);
	$("#cContentModal .btn-"+cNetworkType).removeClass('active');
	$("#cContentModal .btn-"+network).addClass('active');
	$(".content-preview .preview .caption").html(getCNetworkCaption(network));
	cNetworkType = network;
}
function setItemNetwork(itemObj, network){
	if($(itemObj).parent().parent().attr('class')){
		var parentClasses = $(itemObj).parent().parent().attr('class');
		var currentNetwork = parentClasses.split(" ");
		currentNetwork = currentNetwork[currentNetwork.length-1];
		$(itemObj).parent().parent().removeClass(currentNetwork);
		$(itemObj).parent().find(".btn-"+currentNetwork).removeClass('active');
		$(itemObj).parent().parent().addClass(network);
		$(itemObj).parent().find(".btn-"+network).addClass('active');
	}
}

function ajaxMessage(message, type){
	$('#ajaxMessage').find('div').fadeOut('slow', function() {
		$(this).remove();
	 });
	$('#ajaxMessage').prepend('<div class="ajaxMessage '+type+'">'+message+'</div>');
	$('#ajaxMessage .ajaxMessage.'+type).fadeIn('slow');
	if(type=="success"){
		$('#ajaxMessage .ajaxMessage').delay(2000).fadeOut('slow', function() {
			$(this).remove();
		});
	}
}

/* UPLOAD CLASS FOR UPLOADING FILES VIA AJAX */
var Upload = function (file) {
    this.file = file;
};

Upload.prototype.getType = function() {
    return this.file.type;
};
Upload.prototype.getSize = function() {
    return this.file.size;
};
Upload.prototype.getName = function() {
    return this.file.name;
};
Upload.prototype.doUpload = function () {
    var that = this;
    var formData = new FormData();

    // add assoc key values, this will be posts values
    formData.append("file", this.file, this.getName());
    formData.append("file_type", this.file.type);

    $.ajax({
        type: "POST",
        url: "../../repository_queries/socialcontent-upload-media.php",
        xhr: function () {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                myXhr.upload.addEventListener('progress', that.progressHandling, false);
            }
            return myXhr;
        },
        success: function (data) {
			data = jQuery.parseJSON(data);
			ajaxMessage('Content image/video uploaded!', 'success');
            ajaxMessage('Saving content data...', 'processing');
			postData.previewcover = data.cover;
			insertContentData();
        },
        error: function (error) {
            // handle error
			ajaxMessage('Content image/video failed to upload!', 'error');
        },
        async: true,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        timeout: 60000
    });
};

Upload.prototype.progressHandling = function (event) {
    var percent = 0;
    var position = event.loaded || event.position;
    var total = event.total;
    var progress_bar_id = "#progress-wrp";
    if (event.lengthComputable) {
        percent = Math.ceil(position / total * 100);
    }
    // update progressbars classes so it fits your code
    $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
    $(progress_bar_id + " .status").text(percent + "%");
};

/* GET CONTENT */
var contentCategories = [0] // 0 == all;
var page = 1;
var numResults = 20;
var orderBy = 'createdOn';
var order = 'DESC';

$("#sortBy").on("change", function(){
	var sortBy = $(this).val().split("::");
	orderBy = sortBy[0];
	order = sortBy[1];
	page = 1;
	getContent();
})

function generatePageination(numberOfItems){
	var paginationItems = '';
	var pages = Math.ceil(numberOfItems/numResults);
	$(".num-results").html("&nbsp; Num Results: "+numberOfItems);
	if(page==1||numberOfItems==0){
		paginationItems += '';
	}else{
		paginationItems += '<li class="pagination-prev"><a class="page-link" href="javascript:getPrevPage()">Previous</a></li>';
	}
	for (i = 1; i <= pages; i++) { 
    	var active = '';
		if(i==page){
			active = 'active';
		}
		paginationItems += '<li class="page-item '+active+'"><a class="page-link" href="javascript:getPage('+i+')">'+i+'</a></li>';
	}
	if(page==pages||numberOfItems==0){
		paginationItems += '';
	}else{
		paginationItems += '<li class="pagination-next"><a class="page-link" href="javascript:getNextPage()">Next</a></li>';
	}
	$('.pagination').html(paginationItems);
	$(".pagination").rPage();
}

function getPage(pageNum){
	page = pageNum;
	getContent();
}

function getNextPage(){
	page += 1;
	getContent();
}

function getPrevPage(){
	page -= 1;
	getContent();
}

function getContentByCat(categories){
	page = 1;
	contentCategories = categories;
	getContent();
}

function getContent(){
	ajaxMessage('Loading Content...', 'processing');
	$.ajax({
	  method: "POST",
	  url: "../../repository_queries/socialcontent-get-content.php",
	  dataType: 'json',
	  data: { categories: contentCategories, page: page, numResults: numResults, orderBy: orderBy, order: order, userType: userType, userID: userID, userContentOnly: myContentOnly }
	}).done(function( response ) {
		ajaxMessage('Content Loaded!', 'success');
		generateContentPreview(response);
	});
}

function generateContentPreview(response){
	var results = response.results;
	var contentItemHTML = '';
	$.each(results, function(row, cols) {
  		if(cols.categories){
			var contentItemCategoryIDs = cols.categories.split(",");
		}else{
			var contentItemCategoryIDs = new Array();
		}
		var contentItemCategories = '';
		var firstContentItemCategory = true;
		$.each(contentItemCategoryIDs, function(cicidind, cicid) {
			if(!firstContentItemCategory){
				contentItemCategories += ', ';
			}
			contentItemCategories += getCategoryVals(cicid).name;
			firstContentItemCategory = false;
		});
		var UTCTime = moment(cols.createdOn);
		var MSTTime = moment(UTCTime).tz('America/Denver').format('MM/DD/YYYY h:mm:ss A');
		var createdOn = MSTTime;
		var title = (cols.previewtitle?cols.previewtitle:"");
		var desc = (cols.previewdesc?cols.previewdesc:"");
		var domain = (cols.previewdomain?cols.previewdomain:"");
		var cover = (cols.previewcover?cols.previewcover:"");
		var caption = (cols.caption?cols.caption:"");
		var network = "facebook";
		var networkOnly = "";
		if(cols.networkType!=="all"){
			var allowedNetworks = cols.networkType.split(",");
			network = allowedNetworks[allowedNetworks.length - 1];
			networkOnly = cols.networkType;
		}
		
		contentItemHTML += ' \
		<!-- CONTENT ITEM --> \
		<div class="col-md-6" id="content'+cols.id+'"> \
			<div class="panel panel-success '+cols.previewtype+' '+network+'" data-networkonly="'+networkOnly+'"> \
				<!-- CONTENT ITEM HEADER --> \
				<div class="panel-heading clearfix"> \
				  <h4 class="panel-title pull-left" style="padding-top: 7.5px;">Created: '+createdOn+'</h4> \
		';
		if(isEditable(cols.userID, cols.userType)){
			contentItemHTML += ' \
					  <div class="btn-group pull-right"> \
						<a href="javascript:" class="btn btn-default btn-sm edit-btn"><span class="glyphicon glyphicon-pencil"></span> Edit</a> \
						<a href="javascript:" class="btn btn-default btn-sm delete-btn"><span class="glyphicon glyphicon-trash"></span> Delete</a> \
					  </div> \
			';
		}
		var contentUserID = 15;
		if(cols.userType=="user"){
			contentUserID = cols.userID;
		}
		contentItemHTML += ' \
				</div> \
		   		<!-- CONTENT ITEM BODY --> \
			   	<div class="panel-body"> \
				   <div class="caption">'+caption+'</div> \
				   <div class="image-wrapper"> \
				   		<div class="play-icon"></div> \
				   		<div class="imgframe"><a href="http://www.spotlighthometours.com/microsites/content.php?contentID='+cols.id+'&userID='+contentUserID+'" target="_blank"><img src="'+cover+'" /></a></div> \
				   		<h2><a href="http://www.spotlighthometours.com/microsites/content.php?contentID='+cols.id+'&userID='+contentUserID+'" target="_blank">'+title+'</a></h2> \
				   		<p>'+desc+'</p> \
				   		<a href="" class="domain">'+domain+'</a> \
					</div> \
				</div> \
				<!-- CONTENT ITEM FOOTER -->\
				<div class="panel-footer"> \
					<strong>Content rating:</strong> \
                    <span class="pull-right"> \
                        <i class="glyphicon glyphicon-thumbs-up" title="Likes"></i> <div class="like-count">'+cols.likes+'</div> \
                        <i class="glyphicon glyphicon-thumbs-down" title="Dislikes"></i> <div class="dislike-count">'+cols.dislikes+'</div> \
                    </span> \
					<div class="clear"></div> \
                </div> \
';
		if(cols.scheduleFrom){
			var UTCTime = moment(cols.scheduleFrom);
			var MSTTime = moment(UTCTime).tz('America/Denver').format('MM/DD/YYYY h:mm:ss A');
			var fromDate = MSTTime;
			var UTCTime = moment(cols.scheduleTo);
			var MSTTime = moment(UTCTime).tz('America/Denver').format('MM/DD/YYYY h:mm:ss A');
			var toDate = MSTTime;
			contentItemHTML += '\
				<div class="panel-footer"> \
					<i class="glyphicon glyphicon-calendar"></i> '+fromDate+' <i class="glyphicon glyphicon-resize-horizontal"></i> '+toDate+' \
				</div> \
			';
		}else if(cols.scheduledOn){
			var UTCTime = moment(cols.scheduledOn);
			var MSTTime = moment(UTCTime).tz('America/Denver').format('MM/DD/YYYY h:mm:ss A');
			var onDate = MSTTime;
			contentItemHTML += '\
				<div class="panel-footer"> \
					<i class="glyphicon glyphicon-calendar"></i> '+onDate+' \
				</div> \
			';
		}
		contentItemHTML += '\
				<div class="panel-footer"> \
		';
		if(cols.networkType!=="all"){
			$.each(allowedNetworks, function(anindex, anetwork) {
				var active = '';
				if(anetwork==network){
					active = 'active';
				}
				contentItemHTML += ' \
							<a class="btn btn-social-icon btn-xs btn-'+anetwork+' '+active+'" onclick="setItemNetwork(this, \''+anetwork+'\')"><span class="fa fa-'+anetwork+'"></span></a> \
				';
			});
		}else{
			contentItemHTML += ' \
						<a class="btn btn-social-icon btn-xs btn-facebook active" onclick="setItemNetwork(this, \'facebook\')"><span class="fa fa-facebook"></span></a> \
						<a class="btn btn-social-icon btn-xs btn-linkedin" onclick="setItemNetwork(this, \'linkedin\')"><span class="fa fa-linkedin"></span></a> \
						<a class="btn btn-social-icon btn-xs btn-twitter" onclick="setItemNetwork(this, \'twitter\')"><span class="fa fa-twitter"></span></a> \
						<a class="btn btn-social-icon btn-xs btn-instagram" onclick="setItemNetwork(this, \'instagram\')"><span class="fa fa-instagram"></span></a> \
						<a class="btn btn-social-icon btn-xs btn-pinterest" onclick="setItemNetwork(this, \'pinterest\')"><span class="fa fa-pinterest"></span></a> \
			';
		}
		var views = 0;
		if(cols.views){
			views = cols.views;
		}
		contentItemHTML += ' \
					<span class="pull-right"><strong>Views:</strong> '+views+'</span> \
				</div> \
				<div class="panel-footer"><strong>Categorie(s):</strong> '+contentItemCategories+'</div> \
			</div> \
		</div> \
		<div class="clear"></div> \
		';
	});
	$(".saved-content").html(contentItemHTML);
	$('.saved-content .panel-heading .edit-btn').off('click').on('click', function(){
		var contentID = $(this).parent().parent().parent().parent().attr('id').replace("content","");
		editContent(contentID);
	});
	$('.saved-content .panel-heading .delete-btn').off('click').on('click', function(){
		var contentID = $(this).parent().parent().parent().parent().attr('id').replace("content","");
		deleteContent(contentID);
	});
	generatePageination(response.numResults);
	$("img").error(function () {
		if($(this).attr("src").indexOf('../../repository_queries/proxy.php?url=')>-1){
			
		}else{
			$(this).attr("src", "../../repository_queries/proxy.php?url="+$(this).attr("src"));
		}
	});
}
function deleteContent(contentID){
	var sureDelete = confirm("Are you sure you want to delete this content?");
	if(sureDelete){
		ajaxMessage('Deleting Content...', 'error');
		$.ajax({
		  method: "POST",
		  url: "../../repository_queries/socialcontent-delete-content.php",
		  dataType: 'json',
		  data: { contentID: contentID, userType: userType, userID: userID }
		}).done(function( response ) {
			ajaxMessage('Content Deleted!', 'success');
			generateContentPreview(response);
		});
		getContent();
	}
}
function editContent(contentID){
	ajaxMessage('Loading Content Data...', 'processing');
	$.ajax({
		method: "POST",
		url: "../../repository_queries/socialcontent-get-content.php",
		dataType: 'json',
		data: { contentID: contentID, userType: userType, userID: userID }
	}).done(function( response ) {
		ajaxMessage('Content Data Loaded', 'success');
		postData = response;
		showEditContentModal();
	});
}
$("img").error(function () {
	if($(this).attr("src").indexOf('../../repository_queries/proxy.php?url=')>-1){
			
	}else{
		$(this).attr("src", "../../repository_queries/proxy.php?url="+$(this).attr("src"));
	}
});
function isEditable(itemUserID, itemUserType){
	if(itemUserType==userType&&parseInt(itemUserID)==parseInt(userID)){
		return true;
	}else{
		return false;
	}
}
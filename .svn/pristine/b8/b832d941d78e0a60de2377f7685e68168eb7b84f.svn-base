//uploadifive扩展
var IFuncUploadiFive = null;
function FuncUploadiFive() {
	IFuncUploadiFive = this;
	IFuncUploadiFive.count = 1;
	IFuncUploadiFive.actionUrl = "";
	IFuncUploadiFive.uploadPath = "";
	IFuncUploadiFive.btntext = "";
	IFuncUploadiFive.fileType = "";
	IFuncUploadiFive.fileSize = "";
	IFuncUploadiFive.fileLimit = "";
	IFuncUploadiFive.createUserID = "";
	IFuncUploadiFive.personName = "";
	IFuncUploadiFive.controlID = "";
}

FuncUploadiFive.prototype.initUploadiFive = function(onUploadCompleteMyFuncName) {
	$('#' + IFuncUploadiFive.controlID).uploadifive(
			{
				uploadScript : IFuncUploadiFive.actionUrl + '?filePath='
						+ IFuncUploadiFive.uploadPath + "&isCreateFileName=1"
						+ "&createUserID=" + IFuncUploadiFive.createUserID
						+ "&personName=" + IFuncUploadiFive.personName, // Post文件到指定的处理文件
				auto : true, /* 如果是自动上传,那上传按钮将没用了 */
				buttonText : IFuncUploadiFive.btntext,// 上传按钮文字内容
				// queueID: 'some-queue',
				fileType : IFuncUploadiFive.fileType,// 'image/*',//附件类型
				multi : true,
				fileSizeLimit : IFuncUploadiFive.fileSize,// 5242880,
				uploadLimit : 999,// 2,
				queueSizeLimit : 999,// 2,
				removeCompleted : false,
				onUploadComplete : function(file, data) {
					var obj = JSON.parse(data);
					if (obj.img == "500") {
						alert("系统异常！");
					} else {
						IFuncUploadiFive.count++;
						// uploadifiveBorderChe();

						// $("#frontSide").val(obj.img);
						// document.getElementById("submit").disabled = false;
						// $("#uploadifive-fileUploadiFive-queue").hide();
						// addDocItem($.parseJSON(data));
						// up = this;
					}

					if (onUploadCompleteMyFuncName) {
						onUploadCompleteMyFuncName(obj[0], file, data);
					}

					// if (typeof callback == "function") {
					// callback(obj, file, data);
					// }
				},
				onSelect : function(file) {
					// if (count > fileLimit) {
					// alert("最多只能上传" + fileLimit + "个附件");
					// //$('#uploadify').uploadify('stop');
					// //$('#' + controlID).uploadifive('cancel', file.id);
					// return false;
					// }
					// if (file.size > 1024 * 1024 * 30)//size 单位b
					// {
					// alert("文件大小不能超过30M");
					// //$('#uploadify').uploadify('stop');
					// //$('#' + controlID).uploadifive('cancel', file.id);
					// return false;
					// }
				},// 选择文件时触发事件

				onCancel : function(file) {
					// $("#frontSide").val("");
					/* 注意：取消后应重新设置uploadLimit */
					$data = $(this).data('uploadifive');
					settings = $data.settings;
					settings.uploadLimit++;

					// deleteDocument();
					// alert(file.name + " 已取消上传~!");
				},
				onFallback : function() {
					alert("该浏览器无法使用!");
				},
				onUpload : function(file) {

				},
				onCheckCount : function(file) {
					if (IFuncUploadiFive.count > IFuncUploadiFive.fileLimit) {
						alert("最多只能上传" + IFuncUploadiFive.fileLimit + "个附件");
						return false;
					} else {
						return true;
					}
				}
			});
}

function addDocItem(objUploadDocumentItem) {
	IFuncUploadiFive.count++;
	_tbDocItems = $('#tbDocItems');
	if (_tbDocItems.css("display") == "none") {
		_tbDocItems.css("display", "");
	}
	_tbodyDocItems = $('#tbodyDocItems');
	controlID = objUploadDocumentItem.newFileName.replace(/-/g, "");
	_tbodyDocItems
			.append("<tr id='tr"
					+ controlID
					+ "' class='tr"
					+ controlID
					+ "'>"
					+ "<td id='td"
					+ controlID
					+ "' class='tdContent'>"
					+ objUploadDocumentItem.oldFileName
					+ "</td>"
					+ "<td class='tdColHead'><a id=a_"
					+ controlID
					+ " style='cursor:pointer; text-decoration:none;' href='#' onclick='Javascript:deleteDocument(this,\""
					+ objUploadDocumentItem.newFileName
					+ "\")'>×</a><input type='hidden' value='"
					+ objUploadDocumentItem.newFileName
					+ "' name='newFileName' /></td>"
					+ "<td><input type='hidden' id='hidUploadifyFile'"
					+ objUploadDocumentItem.newFileName + " value='"
					+ objUploadDocumentItem.oldFileName + "~!~!"
					+ objUploadDocumentItem.newFileName + "~!~!"
					+ objUploadDocumentItem.FilePath + "' /></td>" + "</tr>");
}

function addDocItemForDetail(objUploadDocumentItem) {
	IFuncUploadiFive.count++;
	_tbDocItems = $('#tbDocItems');
	if (_tbDocItems.css("display") == "none") {
		_tbDocItems.css("display", "");
	}
	_tbodyDocItems = $('#tbodyDocItems');
	controlID = objUploadDocumentItem.newFileName.replace(/-/g, "");
	_tbodyDocItems
			.append("<tr id='tr"
					+ controlID
					+ "' class='tr"
					+ controlID
					+ "'>"
					+ "<td id='td"
					+ controlID
					+ "' class='tdContent'>"
					+ objUploadDocumentItem.oldFileName
					+ "</td>"
					+ "<td class='tdColHead'><a style='cursor:pointer; text-decoration:none;' href='../../Comm/Comm/DownloadFile?showName="
					+ objUploadDocumentItem.oldFileName + "&filePath="
					+ objUploadDocumentItem.FilePath
					+ "')>下载</a><input type='hidden' value='"
					+ objUploadDocumentItem.newFileName
					+ "' name='newFileName' /></td>"
					+ "<td><input type='hidden' id='hidUploadifyFile'"
					+ objUploadDocumentItem.newFileName + " value='"
					+ objUploadDocumentItem.oldFileName + "~!~!"
					+ objUploadDocumentItem.newFileName + "~!~!"
					+ objUploadDocumentItem.FilePath + "' /></td>" + "</tr>");
}

// 清空附件 table(tbodyDocItems) 不删除文件 用于addDocItemForDetail前清空table结构
function emptyFileList() {
	$('#tbodyDocItems').empty();
}

function getUploadFile() {
	var fileData = [];
	$("[id^=hidNewFileName_]").each(function(i) {
		var str = $(this).val();
		if (str) {
			var arr = str.split('~!~!');
		}

		var row = {
			OldName : arr[0],
			NewName : arr[1],
			FilePath : arr[2]
		};
		fileData.push(row);
	})

	return fileData;
}

function deleteDocumentForUploadiFive(MUID) {
	var jsondata = {
		filePath : IFuncUploadiFive.uploadPath
	};

	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8",
		url : "/fileUpload/delete?ran=" + Math.random(),
		dataType : "json",
		data : JSON.stringify(jsondata),
		success : function(data) {
			if (data == "Success") {
				IFuncUploadiFive.count--;
			} else {
				alert("操作失败");
			}

		}
	});
}

// function uploadifiveBorderChe()
// {
// if ($(".uploadifive-queue").find(".uploadifive-queue-item").length > 0) {
// $(".uploadifive-queue").css("border-width", "0px");
// } else {
// $(".uploadifive-queue").css("border-width", "1px");
// }
// }

function deleteDocument(k, MUID) {
	var jsondata = {
		newFileName : MUID,
		filePath : IFuncUploadiFive.uploadPath
	};

	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8",
		url : "/Comm/Comm/DeleteDocument?ran=" + Math.random(),
		dataType : "json",
		data : JSON.stringify(jsondata),
		success : function(data) {
			if (data == "Success") {
				$(k).parent().parent().remove();
				IFuncUploadiFive.count--;
			} else {
				alert("操作失败");
			}

		}
	});
}
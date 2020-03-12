//uploadifive扩展
var IFuncUploadiFive2 = null;
function FuncUploadiFive2() {
	IFuncUploadiFive2 = this;
	IFuncUploadiFive2.count = 1;
	IFuncUploadiFive2.actionUrl = "";
	IFuncUploadiFive2.uploadPath = "";
	IFuncUploadiFive2.btntext = "";
	IFuncUploadiFive2.fileType = "";
	IFuncUploadiFive2.fileSize = "";
	IFuncUploadiFive2.fileLimit = "";
	IFuncUploadiFive2.createUserID = "";
	IFuncUploadiFive2.personName = "";
	IFuncUploadiFive2.controlID = "";
}

FuncUploadiFive2.prototype.initUploadiFive = function(onUploadCompleteMyFuncName) {
	$('#' + IFuncUploadiFive2.controlID).uploadifive(
			{
				uploadScript : IFuncUploadiFive2.actionUrl + '?filePath='
						+ IFuncUploadiFive2.uploadPath + "&isCreateFileName=1"
						+ "&createUserID=" + IFuncUploadiFive2.createUserID
						+ "&personName=" + IFuncUploadiFive2.personName, // Post文件到指定的处理文件
				auto : true, /* 如果是自动上传,那上传按钮将没用了 */
				buttonText : IFuncUploadiFive2.btntext,// 上传按钮文字内容
				// queueID: 'some-queue',
				fileType : IFuncUploadiFive2.fileType,// 'image/*',//附件类型
				multi : true,
				fileSizeLimit : IFuncUploadiFive2.fileSize,// 5242880,
				uploadLimit : 999,// 2,
				queueSizeLimit : 999,// 2,
				removeCompleted : false,
				onUploadComplete : function(file, data) {
					var obj = JSON.parse(data);
					if (obj.img == "500") {
						alert("系统异常！");
					} else {
						IFuncUploadiFive2.count++;
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
					if (IFuncUploadiFive2.count > IFuncUploadiFive2.fileLimit) {
						alert("最多只能上传" + IFuncUploadiFive2.fileLimit + "个附件");
						return false;
					} else {
						return true;
					}
				}
			});
}

function addDocItem(objUploadDocumentItem) {
	IFuncUploadiFive2.count++;
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
	IFuncUploadiFive2.count++;
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
	alert(IFuncUploadiFive2.uploadPath + "   " + MUID);
	var jsondata = {
		filePath : IFuncUploadiFive2.uploadPath
	};

	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8",
		url : "/fileUpload/delete?ran=" + Math.random(),
		dataType : "json",
		data : JSON.stringify(jsondata),
		success : function(data) {
			if (data == "Success") {
				IFuncUploadiFive2.count--;
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
		filePath : IFuncUploadiFive2.uploadPath
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
				IFuncUploadiFive2.count--;
			} else {
				alert("操作失败");
			}

		}
	});
}
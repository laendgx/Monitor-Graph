<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

	<footer class="system-footer">
		<ul>
			<span>共${page.rows }条记录,共${page.totalPage }页</span>
			<li>上一页</li>
			<c:forEach var="x" begin="${page.startPage }" end="${page.endPage }" step="1">
				<c:if test="${x == page.currentPage }">
					<li style="cursor:pointer" class="click_color" onclick="goPage(${x})">${x }</li>
				</c:if>
				<c:if test="${x != page.currentPage }">
					<li style="cursor:pointer" onclick="goPage(${x})">${x }</li>
				</c:if>
			</c:forEach>
			<li>下一页</li>
		</ul>
	</footer>
	<input type="hidden" value="${page.rows }" id="TotalRows">
	<input type="hidden" value="${page.totalPage }" id="TotalPages">
	<input type="hidden" value="${page.currentPage }" id="CurrPage">
	<input type="hidden" value="${page.url }" id="url">

<script type="text/javascript">
	
	function goPage(pageNum){
		var url = $("#url").val();
		var ran = "&ran=" + Math.random();

		var urlEncode = encodeURIComponent(url);
		if (url.indexOf("?") == -1){
			url += "?"
		} else{
			url += "&"
		}
		console.log(url + "currentPage=" + pageNum + "&url=" + urlEncode + ran);
		window.location.href = url + "currentPage=" + pageNum + "&url=" + urlEncode + ran;
	}
</script>
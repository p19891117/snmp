package com.bjhit.util;

import java.util.List;

public class Pager {
	
	private int pageSize = 10;//每页显示记录数 
	
	private List<?> items;
	
	private int totalCount; //总记录数     

	private int totalPage;//总页数 
	
	private int currentPage;//当前页
    
	
	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public List<?> getItems() {
		return items;
	}

	public void setItems(List<?> items) {
		this.items = items;
	}

	public int getTotalCount() {
		return totalCount;
	}


    public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	
	
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public int getTotalPage() {
		
		if (totalCount % this.pageSize == 0) {
			this.totalPage = totalCount / this.pageSize;
		} else {
			this.totalPage = totalCount / this.pageSize + 1;
		}
		return this.totalPage;
	}

	public int getStart(){
		if (currentPage>getTotalPage()) currentPage=1;
		return (currentPage-1)*pageSize;
		
	}
	
	/**
	 * 分页导航
	 * @return
	 */
	public String  getPagerStr() {
		
		StringBuilder sb=new StringBuilder();
		
		int pageCount=getTotalPage();//总页数
		int a_total=10;      //分页条中有多少个超链接
		sb.append("共"+totalCount+"条数据   页次"+currentPage+"/"+pageCount+"页");
		//实际应用中修改上面第三个参数即可

		int a_padding=(int)Math.ceil(a_total/2);  //中间的那个超链接距离边缘链接的间隔a的个数 例如：共11个分页 那么这个就是5

		if(pageCount-currentPage<=a_padding&&currentPage>a_padding+1)
		{
			a_padding=a_total-(pageCount-currentPage);
		}

		int start=currentPage-a_padding,
		end=start+a_total;
		

		if(currentPage-1>0){
			sb.append("&nbsp<a href=\"javascript:document.getElementById('page').value='1';document.getElementById('sub').click();\">首页</a>");
			sb.append("&nbsp<a href=\"javascript:document.getElementById('page').value="+(currentPage-1)+";document.getElementById('sub').click();\">上一页</a>");
		}

		for (int i = start; i <= end; i++) {

			if (i <= 0) {
				end += Math.abs(i);
				i = 1;
			}
			sb.append(" &nbsp<a href=\"javascript:document.getElementById('page').value="+i+";document.getElementById('sub').click();\""
					+ (i == currentPage ? "   style=\"color:red;\"" : "") + "> "
					+ i + " </a> ");

			if (i == pageCount) {
				break;
			}

		}

		if (currentPage - pageCount < 0) {
			sb.append("&nbsp<a href=\"javascript:document.getElementById('page').value="+(currentPage+1)+";document.getElementById('sub').click();\">下一页</a>");
			sb.append("&nbsp<a href=\"javascript:document.getElementById('page').value="+pageCount+";document.getElementById('sub').click();\">尾页</a>");
		}
		if (pageCount == 0) {
			sb=new StringBuilder("");
		}
		return sb.toString();
		
		
	}

	
    
  
	
	
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class PagingParams
    {
        private const int MaxPageSize =50;
        public int PageNumber { get; set; }=1;
        private int _pageSize=10;
        public int PageSize
        {
            get => _pageSize;
            //eğer max sayfa sayısı 50nin üzerindeyse maxpagesize propunu 50ye sabitler değilse value değeri olur
            set => _pageSize = (value>MaxPageSize) ? MaxPageSize : value;
        }
        
    }
}
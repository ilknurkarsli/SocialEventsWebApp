using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class HttpExtentions
    {
        public static void AddpaginationHeader(this HttpResponse response, int currentPage, int itemsPerPage,  int totalItems, int totalPages)
        {
            var paginationHeader = new 
            {
                currentPage,
                itemsPerPage,
                totalPages,
                totalItems
            };
            response.Headers.Append("Pagination", JsonSerializer.Serialize(paginationHeader));
            response.Headers.Append("Access-Control-Expose-Headers", "Pagination");
        }
    }
}
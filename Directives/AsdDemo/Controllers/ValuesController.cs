using AsdDemo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AsdDemo.Controllers
{
    public class ValuesController : ApiController
    {
          public  static List<Product> Products = new List<Product>() {
            new Product() {Id=1,Name="Product1",Count=1,Producer="Producer1"},
            new Product() {Id=2,Name="Product2",Count=2,Producer="Producer2"},
            new Product() {Id=3,Name="Product3",Count=13,Producer="Producer1"},
            new Product() {Id=4,Name="Product4",Count=4,Producer="Producer2"},
            new Product() {Id=5,Name="Product5",Count=5,Producer="Producer1"},
            new Product() {Id=6,Name="Product6",Count=6,Producer="Producer2"},
            new Product() {Id=7,Name="Product7",Count=7,Producer="Producer3"},
            new Product() {Id=8,Name="Product8",Count=8,Producer="Producer1"},
            new Product() {Id=9,Name="Product9",Count=9,Producer="Producer1"},
            new Product() {Id=10,Name="Product10",Count=10,Producer="Producer2"},
            new Product() {Id=11,Name="Product11",Count=10,Producer="Producer2"},
            new Product() {Id=12,Name="Product12",Count=12,Producer="Producer2"},
            new Product() {Id=13,Name="Product13",Count=12,Producer="Producer2"}
        };
        // GET api/values
        public IHttpActionResult Gets(int skip, int take, int page, int pageSize)
        {
            List<Product> result = Products.Skip(skip).Take(take).ToList();
            return Ok(new { Count = Products.Count, data = result });
        }
        public IHttpActionResult Get()
        {
            return Ok(new { Count = Products.Count, data = Products });
        }
        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpPost]
        public IHttpActionResult Delete(List<int> ids)
        {
            //List<Product> ps=Products.Where(
            List<Product> pr = new List<Product>();
            foreach (var item in ids)
            {
                var p = Products.SingleOrDefault(c => c.Id == item);
                if (p != null) Products.Remove(p);
            }

            return Ok();
        }

    }
}

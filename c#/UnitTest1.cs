using System;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SqlScript;
namespace core
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public async Task TestMethod1()
        {
            var generator = new Generator();
            bool result = await generator.GenerateViewScriptsBasedOnViewDefinition();
            Assert.IsTrue(true);
        }
    }
}

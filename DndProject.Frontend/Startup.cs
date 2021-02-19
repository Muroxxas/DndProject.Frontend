using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DndProject.Frontend.Startup))]
namespace DndProject.Frontend
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

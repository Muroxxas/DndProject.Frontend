using Autofac;
using Autofac.Integration.Mvc;
using DnDProject.Backend.Contexts;
using DnDProject.Backend.Services.Implementations;
using DnDProject.Backend.Services.Interfaces;
using DnDProject.Backend.Unit_Of_Work.Implementations;
using DnDProject.Backend.Unit_Of_Work.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DndProject.Frontend.App_Start
{
    public static class ContainerConfig
    {
        public static void Configure()
        {
            var builder = new ContainerBuilder();

            builder.RegisterType<CharacterContext>().AsSelf();
            builder.RegisterType<ItemsContext>().AsSelf();
            builder.RegisterType<PlayableClassContext>().AsSelf();
            builder.RegisterType<RaceContext>().AsSelf();
            builder.RegisterType<SpellsContext>().AsSelf();

            builder.RegisterType<CreateCharacter>().As<ICreateCharacter>();
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>();





            //UNCERTAIN NOTES
            //Every time someone or something requests a controller for use, we will create a new instance 
            //of that controller to handle things, and inject that controller into the request.
            builder.RegisterControllers(typeof(MvcApplication).Assembly)
                .InstancePerRequest();


            IContainer container = builder.Build();

            //Tells the framework, "Hey, is there a situation where you need to resolve what implementation an interface should be passed?"
            //"Whenever that happens, use whatever implementations that have been set up within the container called 'container'." 
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }
    }
}
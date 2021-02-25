using Autofac;
using Autofac.Integration.Mvc;
using DnDProject.Backend.Contexts;
using DnDProject.Backend.Processors.Implementations;
using DnDProject.Backend.Processors.Interfaces;
using DnDProject.Backend.Repository.Implementations;
using DnDProject.Backend.Repository.Implementations.Generic;
using DnDProject.Backend.Repository.Interfaces;
using DnDProject.Backend.Repository.Interfaces.Generic;
using DnDProject.Backend.Services.Implementations;
using DnDProject.Backend.Services.Interfaces;
using DnDProject.Backend.Unit_Of_Work.Implementations;
using DnDProject.Backend.Unit_Of_Work.Interfaces;
using DnDProject.Backend.UserAccess.Implementations;
using DnDProject.Backend.UserAccess.Interfaces;
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

            //UNCERTAIN NOTES
            //Every time someone or something requests a controller for use, we will create a new instance 
            //of that controller to handle things, and inject that controller into the request.
            builder.RegisterControllers(typeof(MvcApplication).Assembly)
                .InstancePerRequest();

            //Services
            builder.RegisterType<CharacterServices>().As<ICharacterServices>();

            //Processors
            builder.RegisterType<CreateCharacter>().As<ICreateCharacter>();
            builder.RegisterType<UpdateCharacter>().As<IUpdateCharacter>();
            builder.RegisterType<CharacterCommonFunctions>().As<ICharacterCommonFunctions>();

            //Access
            builder.RegisterType<BaseUserAccess>().As<IBaseUserAccess>().SingleInstance();

            //UoW
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>();

            //Repository - Characters
            builder.RegisterType<CharacterRepository>().As<ICharacterRepository>();
            builder.RegisterType<CurrencyRepository>().As<ICurrencyRepository>();
            builder.RegisterType<HealthRepository>().As<IHealthRepository>();
            builder.RegisterType<StatsRepository>().As<IStatsRepository>();
            builder.RegisterType<IsProficientRepository>().As<IIsProficientRepository>();
            builder.RegisterType<NotesRepository>().As<INotesRepository>();

            //Repository - Classes
            builder.RegisterType<PlayableClassRepository>().As<IPlayableClassRepository>();
            builder.RegisterType<SubclassRepository>().As<ISubclassRepository>();
            builder.RegisterType<ClassAbilityRepository>().As<IClassAbilityRepository>();
            builder.RegisterType<SubclassAbilityRepository>().As<ISubclassAbilityRepository>();

            //Repository - Items
            builder.RegisterType<ItemsRepository>().As<IItemsRepository>();

            //repository - Spells
            builder.RegisterType<SpellsRepository>().As<ISpellsRepository>();

            //Repository - Race
            builder.RegisterType<RaceRepository>().As<IRaceRepository>();

            //Contexts
            builder.RegisterType<CharacterContext>().AsSelf();
            builder.RegisterType<ItemsContext>().AsSelf();
            builder.RegisterType<PlayableClassContext>().AsSelf();
            builder.RegisterType<RaceContext>().AsSelf();
            builder.RegisterType<SpellsContext>().AsSelf();    




            IContainer container = builder.Build();

            //Tells the framework, "Hey, is there a situation where you need to resolve what implementation an interface should be passed?"
            //"Whenever that happens, use whatever implementations that have been set up within the container called 'container'." 
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }
    }
}
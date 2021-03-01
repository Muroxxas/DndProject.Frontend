﻿using DnDProject.Backend.Services.Interfaces;
using DnDProject.Entities.Character.ViewModels;
using DnDProject.Entities.Character.ViewModels.PartialViewModels.Components;
using Microsoft.AspNet.Identity;
using PagedList;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DndProject.Frontend.Controllers
{
    [Authorize]
    public class CharacterController : Controller
    {

        private ICharacterServices _implementation;

        

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CreateCharacter()
        {
            CharacterVM vm = _implementation.CreateCharacterGET();

            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CreateCharacter(CharacterVM vm)
        {
            if(ModelState.IsValid)
            {
                Guid user_id = Guid.Parse(User.Identity.GetUserId());
                _implementation.CreateCharacterPOST(user_id, vm);

                return RedirectToAction("Index");
            }
            else
            {
                _implementation.CreateCharacterINVALID(vm);

                return View(vm);
            }
        }


        public ActionResult UpdateCharacter(string Character_id)
        {
            Guid user_id = Guid.Parse(User.Identity.GetUserId());
            Guid character_id = Guid.Parse(Character_id);


            CharacterVM vm = _implementation.UpdateCharacterGET(user_id, character_id);

            return View(vm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult UpdateCharacter(CharacterVM vm)
        {
            if (ModelState.IsValid)
            {
                Guid user_id = Guid.Parse(User.Identity.GetUserId());
                _implementation.UpdateCharacterPOST(user_id, vm);
                return RedirectToAction("Index");
            }
            else
            {
                _implementation.UpdateCharacterINVALID(vm);
                return View(vm);
            }
        }

        public ActionResult CharacterSelect()
        {
            Guid user_id = Guid.Parse(User.Identity.GetUserId());
            CharacterSelectVM vm = _implementation.SelectCharacterGET(user_id);

            return View(vm);

        }

        //------Create------

        [HttpGet]
        public PartialViewResult GetBlankKnownClassComponent(int Index)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CharacterObtainsItem(string Character_id, string Item_id, string Index)
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        public JsonResult GetBlankNoteComponent(int index)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public ActionResult CharacterLearnsSpell(string Character_id, string Spell_id)
        {
            throw new NotImplementedException();
        }


        //------Read------
        [HttpGet]
        public ActionResult SearchItems(string searchString, string getItemsBy, string currentFilter, int? page)
        {
            throw new NotImplementedException();
            if(searchString != null)
            {
                page = 1;
            }
            else
            {
                searchString = currentFilter;
            }
            ViewBag.CurrentFilter = searchString;
            ViewBag.currentGetItemsBy = getItemsBy;
            IPagedList<foundItemCM> result = _implementation.SearchItems(searchString, getItemsBy, currentFilter, page);
            if (result.Count > 0)
            {
                //itemSearchResult partial view NYI.
            }
            else 
            {
                //return a view that shows no results found.
            };

        }
        [HttpGet]
        public ActionResult GetItemDetails(string item_id)
        {
            Guid Item_id = Guid.Parse(item_id);
            if(_implementation.ItemExists(Item_id) == true)
            {
                ItemDetailsCM details = _implementation.GetItemDetailsCM(Item_id);

                //foundItemDetails partial view NYI.
                throw new NotImplementedException();
                
            }
            else
            {
                return new HttpStatusCodeResult(500);
            }
        }

        //------Delete------
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CharacterForgetsClass(string Character_id, string Class_id)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CharacterLosesItem(string Character_id, string item_id)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteNote(string Character_id, string Note_id)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CharacterForgetsStell(string Character_id, string Spell_id)
        {
            throw new NotImplementedException();
        }


        //------Misc------
        private static string RenderRazorViewToString(ControllerContext controllerContext, string viewName, object model)
        {
            //Generates and returns a stringified version of the passed view. This allows me to pass multiple partial views into a single object, 
            //and therefore return multiple partials in one action.
            //https://stackoverflow.com/questions/6937156/returning-multiple-partial-views-from-single-controller-action/34968687
            controllerContext.Controller.ViewData.Model = model;

            using (var stringWriter = new StringWriter())
            {
                var viewResult = ViewEngines.Engines.FindPartialView(controllerContext, viewName);
                var viewContext = new ViewContext(controllerContext, viewResult.View, controllerContext.Controller.ViewData,
                    controllerContext.Controller.TempData, stringWriter);
                viewResult.View.Render(viewContext, stringWriter);
                viewResult.ViewEngine.ReleaseView(controllerContext, viewResult.View);
                return stringWriter.GetStringBuilder().ToString();
            }
        }


        public CharacterController(ICharacterServices implementation)
        {
            _implementation = implementation;

        }
    }
}
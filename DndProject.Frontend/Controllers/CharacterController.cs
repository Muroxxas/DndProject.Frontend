using DnDProject.Backend.Facades.Interfaces;
using DnDProject.Entities.Character.ViewModels;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DndProject.Frontend.Controllers
{
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
        public ActionResult CreateCharacter(CharacterVM vm)
        {
            if(ModelState.IsValid)
            {
                Guid user_id = Guid.Parse(User.Identity.GetUserId());
                _implementation.CreateCharacterPOST(user_id, vm);

                return //what?
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

        public CharacterController(ICharacterServices implementation)
        {
            _implementation = implementation;

        }
    }
}
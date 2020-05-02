using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Delivery.DAL.Models;

namespace Delivery.DAL.EFContext
{
    public class SeederDb
    {
        public static void SeedRoles(RoleManager<DbRole> _roleManager)
        {
            var count = _roleManager.Roles.Count();

            if (count <= 0)
            {
                var roleName = "User";
                var result = _roleManager.CreateAsync(new DbRole
                {
                    Name = roleName
                }).Result;

                roleName = "Admin";
                result = _roleManager.CreateAsync(new DbRole
                {
                    Name = roleName
                }).Result;
            }
        }

        public static void SeedUsers(UserManager<DbUser> _userManager,
                                    EFDbContext _context)
        {
            var count = _userManager.Users.Count();

            if (count <= 0)
            {
                #region Create first user
                string mail = "semen@ukr.net";
                var roleName = "User";
                var user = new DbUser
                {
                    Email = mail,
                    UserName = mail,
                    PhoneNumber = "+380991111111"
                };

                var result = _userManager.CreateAsync(user, "Qwerty-1").Result;
                var date = new DateTime(1974, 9, 20);
                var userProfile = new UserProfile
                {
                    Id = user.Id,
                    FirstName = "Semen",
                    MiddleName = "Semenovuch",
                    LastName = "Semenuk",
                    RegistrationDate = DateTime.Now,
                    BirthDate = date,
                    Photo = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Semen_Paliy.jpg/274px-Semen_Paliy.jpg"
                };
                var userAccess = new UserAccess
                {
                    Id = user.Id,
                    Reason = "Bad attitude to other customers",
                    DateBlock = DateTime.Now,
                    IsUnblock = false
                };

                _context.UserProfile.Add(userProfile);
                _context.UsersAccesses.Add(userAccess);
                result = _userManager.AddToRoleAsync(user, roleName).Result;
                #endregion

                #region Create second user
                mail = "denis@ukr.net";
                user = new DbUser
                {
                    Email = mail,
                    UserName = mail,
                    PhoneNumber = "+380992222222"
                };

                result = _userManager.CreateAsync(user, "Qwerty-2").Result;
                date = new DateTime(1985, 9, 20);
                userProfile = new UserProfile
                {
                    Id = user.Id,
                    FirstName = "Denis",
                    MiddleName = "Denisovych",
                    LastName = "Denysiuk",
                    RegistrationDate = DateTime.Now,
                    BirthDate = date,
                    Photo = "https://file.liga.net/images/general/2020/02/04/20200204130420-9096.jpg?v=1580819052"
                };
                userAccess = new UserAccess
                {
                    Id = user.Id,
                    Reason = "Bad user",
                    DateBlock = DateTime.Now,
                    IsUnblock = true
                };

                _context.UserProfile.Add(userProfile);
                _context.UsersAccesses.Add(userAccess);
                result = _userManager.AddToRoleAsync(user, roleName).Result;
                #endregion

                #region Create third user
                mail = "ivan@ukr.net";
                user = new DbUser
                {
                    Email = mail,
                    UserName = mail,
                    PhoneNumber = "+380993333333"
                };

                result = _userManager.CreateAsync(user, "Qwerty-3").Result;
                date = new DateTime(1995, 9, 20);
                userProfile = new UserProfile
                {
                    Id = user.Id,
                    FirstName = "Ivan",
                    MiddleName = "Ivanovych",
                    LastName = "Ivanov",
                    RegistrationDate = DateTime.Now,
                    BirthDate = date,
                    Photo = "https://upload.wikimedia.org/wikipedia/uk/5/5a/PantelevIvan.jpg"
                };
                userAccess = new UserAccess
                {
                    Id = user.Id,
                    Reason = "User doesn't pay for food",
                    DateBlock = DateTime.Now,
                    IsUnblock = true
                };

                _context.UserProfile.Add(userProfile);
                _context.UsersAccesses.Add(userAccess);
                result = _userManager.AddToRoleAsync(user, roleName).Result;
                #endregion

                #region Create user with existing email
                mail = "amerscan8@gmail.com";
                roleName = "User";
                user = new DbUser
                {
                    Email = mail,
                    UserName = mail,
                    PhoneNumber = "+380967289363"
                };

                result = _userManager.CreateAsync(user, "Qwerty-4").Result;
                date = new DateTime(2003, 10, 21);
                userProfile = new UserProfile
                {
                    Id = user.Id,
                    FirstName = "Denys",
                    MiddleName = "Valentynovych",
                    LastName = "Yaremchuk",
                    RegistrationDate = DateTime.Now,
                    BirthDate = date
                };
                userAccess = new UserAccess
                {
                    Id = user.Id,
                    Reason = "Bad attitude to other customers",
                    DateBlock = DateTime.Now,
                    IsUnblock = true
                };

                _context.UserProfile.Add(userProfile);
                _context.UsersAccesses.Add(userAccess);
                result = _userManager.AddToRoleAsync(user, roleName).Result;
                #endregion

                #region Create admin
                string mailAdmin = "batman@ukr.net";
                var roleNameAdmin = "Admin";
                var userAdmin = new DbUser
                {
                    Email = mailAdmin,
                    UserName = mailAdmin,
                    PhoneNumber = "+380990000000"
                };

                var resultAdmin = _userManager.CreateAsync(userAdmin, "Qwerty-0").Result;
                var dateAdmin = new DateTime(1975, 9, 20);
                var adminProfile = new UserProfile
                {
                    Id = userAdmin.Id,
                    FirstName = "Batman",
                    MiddleName = "Batmanovych",
                    LastName = "Batmanchuk",
                    RegistrationDate = DateTime.Now,
                    BirthDate = dateAdmin,
                    Photo = "https://upload.wikimedia.org/wikipedia/ru/a/a2/Batman_Jim_Lee.jpg"
                };

                _context.UserProfile.Add(adminProfile);
                resultAdmin = _userManager.AddToRoleAsync(userAdmin, roleNameAdmin).Result;
                #endregion

                _context.SaveChanges();
            }
        }

        public static void SeedTypeOfDish(EFDbContext _context)
        {
            if (_context.TypesOfDishes.Count() <= 0)
            {
                var typeOfDishes = new List<TypeOfDish>();
                typeOfDishes.Add(new TypeOfDish
                {
                    Image = "https://img1.russianfood.com/dycontent/images_upl/5/sm_4382.jpg",
                    TypeOfDishName = "First"
                });
                typeOfDishes.Add(new TypeOfDish
                {
                    Image = "https://img1.russianfood.com/dycontent/images_upl/5/sm_4382.jpg",
                    TypeOfDishName = "Second"
                });
                typeOfDishes.Add(new TypeOfDish
                {
                    Image = "https://img1.russianfood.com/dycontent/images_upl/5/sm_4382.jpg",
                    TypeOfDishName = "Dessert"
                });
                foreach (var typeOfDish in typeOfDishes)
                {
                    _context.TypesOfDishes.Add(typeOfDish);
                }
                _context.SaveChanges();
            }
        }

        public static void SeedTypeOfCuisine(EFDbContext _context)
        {
            if (_context.TypesOfCuisines.Count() <= 0)
            {
                var typeOfCuisines = new List<TypeOfCuisine>();
                typeOfCuisines.Add(new TypeOfCuisine
                {
                    Image = "https://img1.russianfood.com/dycontent/images_upl/5/sm_4382.jpg",
                    TypeOfCuisineName = "Italian"
                });
                typeOfCuisines.Add(new TypeOfCuisine
                {
                    Image = "https://img1.russianfood.com/dycontent/images_upl/5/sm_4382.jpg",
                    TypeOfCuisineName = "Chinese"
                });
                typeOfCuisines.Add(new TypeOfCuisine
                {
                    Image = "https://img1.russianfood.com/dycontent/images_upl/5/sm_4382.jpg",
                    TypeOfCuisineName = "Ukrainian"
                });
                typeOfCuisines.Add(new TypeOfCuisine
                {
                    Image = "https://img1.russianfood.com/dycontent/images_upl/5/sm_4382.jpg",
                    TypeOfCuisineName = "American"
                });
                typeOfCuisines.Add(new TypeOfCuisine
                {
                    Image = "https://img1.russianfood.com/dycontent/images_upl/5/sm_4382.jpg",
                    TypeOfCuisineName = "French"
                });
                typeOfCuisines.Add(new TypeOfCuisine
                {
                    Image = "https://img1.russianfood.com/dycontent/images_upl/5/sm_4382.jpg",
                    TypeOfCuisineName = "Caucasus"
                });
                typeOfCuisines.Add(new TypeOfCuisine
                {
                    Image = "https://img1.russianfood.com/dycontent/images_upl/5/sm_4382.jpg",
                    TypeOfCuisineName = "Japanese"
                });
                typeOfCuisines.Add(new TypeOfCuisine
                {
                    Image = "https://img1.russianfood.com/dycontent/images_upl/5/sm_4382.jpg",
                    TypeOfCuisineName = "Spanish"
                });
                typeOfCuisines.Add(new TypeOfCuisine
                {
                    Image = "https://img1.russianfood.com/dycontent/images_upl/5/sm_4382.jpg",
                    TypeOfCuisineName = "English"
                });
                typeOfCuisines.Add(new TypeOfCuisine
                {
                    Image = "https://img1.russianfood.com/dycontent/images_upl/5/sm_4382.jpg",
                    TypeOfCuisineName = "German"
                });
                foreach (var typeOfDish in typeOfCuisines)
                {
                    _context.TypesOfCuisines.Add(typeOfDish);
                }
                _context.SaveChanges();
            }
        }

        public static void SeedOrderStatus(EFDbContext _context)
        {
            if (_context.OrdersStatuses.Count() <= 0)
            {
                var orderStatus = new List<OrderStatus>();
                orderStatus.Add(new OrderStatus
                {
                    StatusName = "In progress"
                });
                orderStatus.Add(new OrderStatus
                {
                    StatusName = "Order received. Processing data"
                });
                orderStatus.Add(new OrderStatus
                {
                    StatusName = "Done"
                });
                foreach (var status in orderStatus)
                {
                    _context.OrdersStatuses.Add(status);
                }
                _context.SaveChanges();
            }
        }

        public static void SeedExtra(EFDbContext _context)
        {
            if (_context.Extras.Count() <= 0)
            {
                List<Extra> extras = new List<Extra>();
                extras.Add(new Extra
                {
                    Name = "Ketсhup",
                    Description = "Ketchup make taste brighter",
                    Measuring = "50 grams",
                    Image = "https://harchi.info/files/2981-ketchup-and-potato.jpg"
                });
                extras.Add(new Extra
                {
                    Name = "Mustard",
                    Description = "Ketchup make taste bitter",
                    Measuring = "50 grams",
                    Image = "https://m.dom-eda.com/uploads/images/catalog/item/7f4e65cfc2/f674ed3b6f_500.jpg"
                });
                extras.Add(new Extra
                {
                    Name = "Sour cream",
                    Description = "Sour cream make taste a little bit sour",
                    Measuring = "50 grams",
                    Image = "https://vecherniy.kharkov.ua/i/2019/162310.jpg"
                });
                foreach (var extra in extras)
                {
                    _context.Extras.Add(extra);
                }
                _context.SaveChanges();
            }
        }

        public static void SeedDish(EFDbContext _context)
        {
            if (_context.Dishes.Count() <= 0)
            {
                List<Dish> dishes = new List<Dish>();
                dishes.Add(new Dish
                {
                    Name = "Pizza Margarita",
                    Ingredients = "Flour, fresh yeast, oil, water, salt, tomatoes, garlic " +
                    "oil, dutch cheese, greens, pepper",
                    Description = "Tasty pizza",
                    Weight = 400,
                    Image = "https://shostkasyr.com/images/receipts/eiwjdfs.jpg",
                    IsVegetarian = false,
                    IsAvailable = true,
                    Price = 100,
                    TypeOfCuisineId = _context.TypesOfCuisines.FirstOrDefault(x => x.TypeOfCuisineName == "Italian").Id,
                    TypeOfDishId = _context.TypesOfDishes.FirstOrDefault(x => x.TypeOfDishName == "Second").Id
                });
                dishes.Add(new Dish
                {
                    Name = "Chicken and Shrimp Paella",
                    Ingredients = "Chicken thighs, Vegetable broth, Olive oil, Sweet pepper, Raw Shrimp, Salt, Pepper, Tomatoes, Rice, Beans, Saffron, Perey cayenne, Paprika, Parsley",
                    Description = "This is a classic spanish dish",
                    Weight = 200,
                    Image = "https://img1.russianfood.com/dycontent/images_upl/5/sm_4382.jpg",
                    IsVegetarian = false,
                    IsAvailable = true,
                    Price = 50,
                    TypeOfCuisineId = _context.TypesOfCuisines.FirstOrDefault(x => x.TypeOfCuisineName == "Spanish").Id,
                    TypeOfDishId = _context.TypesOfDishes.FirstOrDefault(x => x.TypeOfDishName == "Second").Id
                });
                dishes.Add(new Dish
                {
                    Name = "Apple cake(tart)",
                    Ingredients = "Puff pastry, Vanilla pod, Butter, Honey, Apples, Cognac, Sugar",
                    Description = "Typical for French cuisine open pie stuffed with apple.",
                    Weight = 100,
                    Image = "https://i.i.ua/cook/pic/0/6/11760.jpg",
                    IsVegetarian = false,
                    IsAvailable = true,
                    Price = 65.5M,
                    TypeOfCuisineId = _context.TypesOfCuisines.FirstOrDefault(x => x.TypeOfCuisineName == "French").Id,
                    TypeOfDishId = _context.TypesOfDishes.FirstOrDefault(x => x.TypeOfDishName == "Dessert").Id
                });
                dishes.Add(new Dish
                {
                    Name = "Eintopf Soup",
                    Ingredients = "Pork(or beef), Chicken fillet, Carrot, Potato, Pea, Bean, Vegetable oil, Onion, Garlic, Salt, Pepper",
                    Description = "Eintopf is a savory, mouth - watering German soup that can serve both first and second courses at the same time.",
                    Weight = 150,
                    Image = "https://smachno.ua/wp-content/uploads/2018/05/10/Depositphotos_21334169_m-2015.jpg",
                    IsVegetarian = false,
                    IsAvailable = true,
                    Price = 70M,
                    TypeOfCuisineId = _context.TypesOfCuisines.FirstOrDefault(x => x.TypeOfCuisineName == "German").Id,
                    TypeOfDishId = _context.TypesOfDishes.FirstOrDefault(x => x.TypeOfDishName == "First").Id
                });
                dishes.Add(new Dish
                {
                    Name = "Gedza",
                    Ingredients = "Minced meat, Beijing cabbage, Garlic, Ginger(root), Lemon juice, Rice vinegar, Soy sauce, Fish sauce, green onion, Fresh pepper(mixture), Salt, Flour, Starch, Boiling water, Salt",
                    Description = "Gedza is the Japanese name for Chinese fried jiaoji dumplings.",
                    Weight = 225,
                    Image = "https://smachno.ua/wp-content/uploads/2018/12/19/2136.jpg",
                    IsVegetarian = false,
                    IsAvailable = true,
                    Price = 80M,
                    TypeOfCuisineId = _context.TypesOfCuisines.FirstOrDefault(x => x.TypeOfCuisineName == "Japanese").Id,
                    TypeOfDishId = _context.TypesOfDishes.FirstOrDefault(x => x.TypeOfDishName == "Second").Id
                });
                dishes.Add(new Dish
                {
                    Name = "Meat balls in rice paper",
                    Ingredients = "Low-fat beef, garlic, green onion, soy sauce, hot peppers, rice paper, lime, soy sauce, sugar",
                    Description = "This is Chinese dumplings with hot pepper",
                    Weight = 150,
                    Image = "http://stravy.net/uploads/images/default/041b818dad29f5eb2ef6768183bc1eb6_still0630_00045.jpg",
                    IsVegetarian = false,
                    IsAvailable = true,
                    Price = 60M,
                    TypeOfCuisineId = _context.TypesOfCuisines.FirstOrDefault(x => x.TypeOfCuisineName == "Chinese").Id,
                    TypeOfDishId = _context.TypesOfDishes.FirstOrDefault(x => x.TypeOfDishName == "Second").Id
                });
                foreach (var dish in dishes)
                {
                    _context.Dishes.Add(dish);
                }
                _context.SaveChanges();
            }
        }

        public static void SeedData(IServiceProvider services, IHostingEnvironment env, IConfiguration config)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var user_manager = scope.ServiceProvider.GetRequiredService<UserManager<DbUser>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<DbRole>>();
                var context = scope.ServiceProvider.GetRequiredService<EFDbContext>();

                SeederDb.SeedRoles(managerRole);
                SeederDb.SeedUsers(user_manager, context);
                SeederDb.SeedTypeOfDish(context);
                SeederDb.SeedTypeOfCuisine(context);
                SeederDb.SeedOrderStatus(context);
                SeederDb.SeedExtra(context);
                SeederDb.SeedDish(context);
            }
        }
    }
}
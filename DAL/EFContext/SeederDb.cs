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
                    IsUnblock = true
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
                var adminProfile = new AdminProfile
                {
                    Id = userAdmin.Id,
                    FirstName = "Batman",
                    MiddleName = "Batmanovych",
                    LastName = "Batmanchuk",
                    RegistrationDate = DateTime.Now,
                    BirthDate = dateAdmin,
                    Photo = "https://upload.wikimedia.org/wikipedia/ru/a/a2/Batman_Jim_Lee.jpg"
                };

                _context.AdminProfile.Add(adminProfile);
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
                    TypeOfDishName = "First"
                });
                typeOfDishes.Add(new TypeOfDish
                {
                    TypeOfDishName = "Second"
                });
                typeOfDishes.Add(new TypeOfDish
                {
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
                    TypeOfCuisineName = "Italian"
                });
                typeOfCuisines.Add(new TypeOfCuisine
                {
                    TypeOfCuisineName = "Chinese"
                });
                typeOfCuisines.Add(new TypeOfCuisine
                {
                    TypeOfCuisineName = "Ukrainian"
                });
                typeOfCuisines.Add(new TypeOfCuisine
                {
                    TypeOfCuisineName = "American"
                });
                typeOfCuisines.Add(new TypeOfCuisine
                {
                    TypeOfCuisineName = "French"
                });
                typeOfCuisines.Add(new TypeOfCuisine
                {
                    TypeOfCuisineName = "Caucasus"
                });
                typeOfCuisines.Add(new TypeOfCuisine
                {
                    TypeOfCuisineName = "Japanese"
                });
                typeOfCuisines.Add(new TypeOfCuisine
                {
                    TypeOfCuisineName = "Spanish"
                });
                typeOfCuisines.Add(new TypeOfCuisine
                {
                    TypeOfCuisineName = "English"
                });
                typeOfCuisines.Add(new TypeOfCuisine
                {
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
                    TypeOfCuisineId = _context.TypesOfCuisines.FirstOrDefault(x => x.TypeOfCuisineName == "Italian").TypeOfCuisineId,
                    TypeOfDishId = _context.TypesOfDishes.FirstOrDefault(x => x.TypeOfDishName == "Second").TypeOfDishId
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
                    TypeOfCuisineId = _context.TypesOfCuisines.FirstOrDefault(x => x.TypeOfCuisineName == "Spanish").TypeOfCuisineId,
                    TypeOfDishId = _context.TypesOfDishes.FirstOrDefault(x => x.TypeOfDishName == "Second").TypeOfDishId
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
                    TypeOfCuisineId = _context.TypesOfCuisines.FirstOrDefault(x => x.TypeOfCuisineName == "French").TypeOfCuisineId,
                    TypeOfDishId = _context.TypesOfDishes.FirstOrDefault(x => x.TypeOfDishName == "Dessert").TypeOfDishId
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
                    TypeOfCuisineId = _context.TypesOfCuisines.FirstOrDefault(x => x.TypeOfCuisineName == "German").TypeOfCuisineId,
                    TypeOfDishId = _context.TypesOfDishes.FirstOrDefault(x => x.TypeOfDishName == "First").TypeOfDishId
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
                    TypeOfCuisineId = _context.TypesOfCuisines.FirstOrDefault(x => x.TypeOfCuisineName == "Japanese").TypeOfCuisineId,
                    TypeOfDishId = _context.TypesOfDishes.FirstOrDefault(x => x.TypeOfDishName == "Second").TypeOfDishId
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
                    TypeOfCuisineId = _context.TypesOfCuisines.FirstOrDefault(x => x.TypeOfCuisineName == "Chinese").TypeOfCuisineId,
                    TypeOfDishId = _context.TypesOfDishes.FirstOrDefault(x => x.TypeOfDishName == "Second").TypeOfDishId
                });
                foreach (var dish in dishes)
                {
                    _context.Dishes.Add(dish);
                }
                _context.SaveChanges();
            }
        }

        public static void SeedOrder(EFDbContext _context)
        {
            if (_context.Orders.Count() <= 0)
            {
                var dateReceived = DateTime.Now;
                var dateOfDelivery = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 1, 20, 0);
                dateReceived.AddHours(1);
                dateReceived.AddMinutes(20);

                var order = new Order
                {
                    OrderInvoice = "0000001",
                    UserId = _context.UserProfile.FirstOrDefault(x => x.FirstName == "Semen").Id,
                    Address = "Rivne, Soborna str., 14",
                    DateOfCreate = DateTime.Now,
                    DateOfDelivery = dateOfDelivery,
                    DateReceived = dateReceived,
                };
                var dishes = new List<DishInOrder>();
                dishes.Add(new DishInOrder
                {
                    OrderId = order.OrderId,
                    DishId = _context.Dishes.FirstOrDefault(x => x.Name == "Pizza").Id,
                    Amount = 2
                });
                var extras = new List<ExtraInOrder>();
                extras.Add(new ExtraInOrder
                {
                    OrderId = order.OrderId,
                    ExtraId = _context.Extras.FirstOrDefault(x => x.Name == "Ketchup").ExtraId,
                    Amount = 2
                });
                order.Dishes = dishes;
                order.Extras = extras;

                decimal totalPrice = 0;
                string wishes = "";
                Dish dish;
                //Extra extra;

                foreach (var dishInOrder in dishes)
                {
                    _context.DishesInOrder.Add(dishInOrder);
                    dish = _context.Dishes.FirstOrDefault(x => x.Id == dishInOrder.DishId);
                    totalPrice += dishInOrder.Amount * dish.Price;
                    wishes += $"{dish.Name} ";
                }
                foreach (var extraInOrder in extras)
                {
                    _context.ExtrasInOrder.Add(extraInOrder);
                    //extra = _context.Extras.FirstOrDefault(x => x.ExtraId == extraInOrder.ExtraId);
                    //totalPrice += extraInOrder.Amount * extra.
                }
                order.TotalPrice = totalPrice;
                order.CustomerWishes = wishes;

                _context.Orders.Add(order);
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

                //SeederDb.SeedRoles(managerRole);
                //SeederDb.SeedUsers(user_manager, context);
                //SeederDb.SeedTypeOfDish(context);
                //SeederDb.SeedTypeOfCuisine(context);
                //SeederDb.SeedOrderStatus(context);
                //SeederDb.SeedExtra(context);
                //SeederDb.SeedDish(context);
                SeederDb.SeedOrder(context);
            }
        }
    }
}
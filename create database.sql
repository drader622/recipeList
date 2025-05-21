-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: meals
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredients` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ingredient_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=441 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES (1,'Boneless Skinless Chicken Breasts');
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meal_list`
--

DROP TABLE IF EXISTS `meal_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meal_list` (
  `meal_id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` varchar(45) DEFAULT NULL,
  `recipe_name` varchar(45) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`meal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=312 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meal_list`
--

LOCK TABLES `meal_list` WRITE;
/*!40000 ALTER TABLE `meal_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `meal_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `measurement_qty`
--

DROP TABLE IF EXISTS `measurement_qty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `measurement_qty` (
  `measurement_qty_id` int NOT NULL AUTO_INCREMENT,
  `qty_amount` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`measurement_qty_id`)
) ENGINE=InnoDB AUTO_INCREMENT=219 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `measurement_qty`
--

LOCK TABLES `measurement_qty` WRITE;
/*!40000 ALTER TABLE `measurement_qty` DISABLE KEYS */;
INSERT INTO `measurement_qty` VALUES (200,'.25'),(201,'.5'),(202,'.75'),(203,'1'),(204,'1.25'),(205,'1.5'),(206,'1.75'),(207,'2'),(208,'3'),(209,'4'),(210,'5'),(211,'6'),(212,'7'),(213,'8'),(214,'9'),(215,'10'),(216,'.3');
/*!40000 ALTER TABLE `measurement_qty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `measurement_units`
--

DROP TABLE IF EXISTS `measurement_units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `measurement_units` (
  `measurement_id` int NOT NULL AUTO_INCREMENT,
  `measurement_unit` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`measurement_id`)
) ENGINE=InnoDB AUTO_INCREMENT=308 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `measurement_units`
--

LOCK TABLES `measurement_units` WRITE;
/*!40000 ALTER TABLE `measurement_units` DISABLE KEYS */;
INSERT INTO `measurement_units` VALUES (1,'cups'),(2,'oz'),(3,'Tbsp.'),(4,'tsp.'),(5,'units'),(6,'fl. oz');
/*!40000 ALTER TABLE `measurement_units` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_category`
--

DROP TABLE IF EXISTS `recipe_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_category` (
  `id` bigint NOT NULL,
  `category_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_category`
--

LOCK TABLES `recipe_category` WRITE;
/*!40000 ALTER TABLE `recipe_category` DISABLE KEYS */;
INSERT INTO `recipe_category` VALUES (1,'Chicken'),(2,'Pork'),(3,'Beef'),(4,'Seafood'),(5,'Turkey'),(6,'Vegetarian');
/*!40000 ALTER TABLE `recipe_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_ingredients`
--

DROP TABLE IF EXISTS `recipe_ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_ingredients` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `recipe_id` bigint DEFAULT NULL,
  `ingredient` varchar(255) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `unit` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=233 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_ingredients`
--

LOCK TABLES `recipe_ingredients` WRITE;
/*!40000 ALTER TABLE `recipe_ingredients` DISABLE KEYS */;
INSERT INTO `recipe_ingredients` VALUES (1,1,'Boneless Skinless Chicken Breasts',12.00,'oz'),(2,1,'Zucchini',2.00,'whole'),(3,1,'Lemon',1.00,'whole'),(4,1,'Persian Cucumber',1.00,'whole'),(5,1,'Panko Breadcrumbs',0.50,'cup'),(6,1,'Sour Cream',1.00,'whole'),(7,1,'Crumbled Feta Cheese',0.50,'whole'),(8,1,'Garlic Cloves',2.00,'whole'),(9,1,'Buttermilk-Dill Seasoning',1.00,'tsp'),(10,1,'Dill Sprigs',2.00,'whole'),(11,2,'Ground Pork',10.00,'oz'),(12,2,'Green Bell Pepper',1.00,'whole'),(13,2,'Long Grain White Rice',5.47,'oz'),(14,2,'Broccoli Florets',4.00,'oz'),(15,2,'Orange Ginger Ssame Sauce',4.00,'oz'),(16,2,'Wonton Strips',0.50,'whole'),(17,2,'Green Onions',2.00,'whole'),(18,2,'Asian Garlic, Ginger & Chile Seasoning',1.00,'tsp'),(19,2,'Garlic Salt',0.50,'tsp'),(20,2,'Multicolor Sesame Seeds',1.00,'tsp'),(21,3,'Sliced Pork',10.00,'whole'),(22,3,'Red Onion',1.00,'whole'),(23,3,'Small Flour Tortillas',6.00,'whole'),(24,3,'BBQ Sauce',3.00,'oz'),(25,3,'Corn Kernels',3.00,'whole'),(26,3,'Shredded Cheddar Cheese',2.00,'oz'),(27,3,'Buttermilk Ranch Dressing',1.50,'fl. oz'),(28,3,'Crispy jalapenos',0.50,'oz'),(29,3,'Fiesta Seasoning',0.50,'whole'),(30,4,'Yukon Potatoes',12.00,'oz'),(31,4,'Steak Strips',10.00,'whole'),(32,4,'Pretzel Buns',2.00,'whole'),(33,4,'Cream Cheese',1.00,'whole'),(34,4,'Shredded Cheddar Cheese',1.00,'oz'),(35,4,'Green Onions',2.00,'whole'),(36,4,'Mirepoix Broth Concentrate',2.00,'whole'),(37,4,'Mushroom Seasoning',2.00,'whole'),(38,4,'Garlic Pepper',0.50,'tsp'),(39,5,'Boneless Skinless Chicken Breasts',12.00,'oz'),(40,5,'Carrot',12.00,'oz'),(41,5,'Yukon Potatoes',12.00,'oz'),(42,5,'Cream Cheese',1.00,'oz'),(43,5,'Butter',1.00,'whole'),(44,5,'Roasted Garlic & Herb Butter',0.75,'oz'),(45,5,'Honey',1.00,'fl. oz'),(46,5,'Pine Nuts',1.00,'oz'),(47,5,'Rosemary Sprig',1.00,'whole'),(48,5,'Seasoned Salt Blend',0.50,'whole'),(49,6,'Patagonian petite Scallops',8.00,'oz'),(50,6,'Spaghetti',5.00,'oz'),(51,6,'Marinara Sauce',4.00,'oz'),(52,6,'Grape Tomatoes',4.00,'oz'),(53,6,'Shredded Asiago Cheese',1.00,'oz'),(54,6,'Arrabbiata Pesto',2.00,'Tbsp.'),(55,6,'Panko Breadcrumbs',0.25,'cup'),(56,6,'Garlic Cloves',2.00,'whole'),(57,6,'Red Pepper Flakes',0.25,'tsp'),(58,6,'Garlic Salt',0.50,'tsp'),(59,7,'Salmon Fillets',12.00,'whole'),(60,7,'Zucchini',2.00,'whole'),(61,7,'Lemon',1.00,'whole'),(62,7,'Grape Tomatoes',4.00,'oz'),(63,7,'Grated Parmesan Cheese',1.00,'oz'),(64,7,'Butter',0.60,'oz'),(65,7,'Garlic Cloves',2.00,'whole'),(66,7,'Capers',0.25,'whole'),(67,8,'Shrimp',8.00,'oz'),(68,8,'Small Flour Tortillas',6.00,'whole'),(69,8,'Slaw Mix',4.00,'oz'),(70,8,'Poblano Pepper',1.00,'unit'),(71,8,'Lime',1.00,'unit'),(72,8,'Mayonnaise',1.26,'oz'),(73,8,'Apricot Preserves',1.00,'oz'),(74,8,'Cornstarch',2.00,'Tbsp.'),(75,8,'Grated Cotija Cheese',0.50,'whole'),(76,8,'Ancho Cinnomon Rub',2.00,'tsp'),(77,9,'Ground Beef',10.00,'oz'),(78,9,'Carrot',8.00,'oz'),(79,9,'Zucchini',1.00,'whole'),(80,9,'Cream Cheese',2.00,'oz'),(81,9,'Panko Breadcrumbs',0.25,'whole'),(82,9,'Green Onions',2.00,'whole'),(83,9,'Grated Cotija Cheese',0.50,'oz'),(84,9,'Chipotle Pesto',1.00,'whole'),(85,9,'Chile and Cumin Rub',1.00,'tsp'),(86,9,'Onion Salt',1.00,'tsp'),(87,10,'Zucchini',2.00,'whole'),(88,10,'Steelhead Trout Filets',10.00,'oz'),(89,10,'Red Bell Pepper',1.00,'whole'),(90,10,'Tomato Feta Sauce',2.00,'oz'),(91,10,'Crumbled Feta Cheese',1.00,'oz'),(92,10,'Buttermilk-Dill Seasoning',1.00,'whole'),(93,10,'Za\'atar Seasoning',1.00,'tsp'),(94,11,'Green Beans',12.00,'oz'),(95,11,'Ground Turkey',10.00,'whole'),(96,11,'Sun Dried Tomato pesto',1.00,'oz'),(97,11,'Beurre Blanc Butter',1.00,'whole'),(98,11,'Mayonnaise',0.84,'oz'),(99,11,'Roasted Sliced Almonds',0.50,'oz'),(100,11,'Grated Parmesan Cheese',0.50,'oz'),(101,11,'Saltine Crackers',2.00,'whole'),(102,11,'Garlic Salt',0.50,'tsp'),(103,12,'Boneless Pork Chops',12.00,'oz'),(104,12,'Carrot',8.00,'oz'),(105,12,'Sweet Potato Cubes',8.00,'oz'),(106,12,'Walnut Halves',1.00,'oz'),(107,12,'Garlic Cloves',4.00,'whole'),(108,12,'Cilantro',0.25,'oz'),(109,12,'Parsley',0.25,'oz'),(110,12,'Chimichurri Seasoning',2.00,'tsp'),(111,12,'Seasoned Salt Blend',1.00,'tsp'),(112,12,'Smoked Paprika',0.50,'tsp'),(113,13,'Red Beet',12.00,'oz'),(114,13,'Arborio Rice',0.75,'cup'),(115,13,'White Cooking Wine',2.00,'fl. oz'),(116,13,'Butter',1.00,'oz'),(117,13,'Goat Cheese',1.00,'oz'),(118,13,'Roasted Pistachios',0.75,'oz'),(119,13,'Grated Parmesan Cheese',0.50,'oz'),(120,13,'Mirepoix Broth Concentrate',2.00,'tsp'),(121,13,'Garlic Cloves',2.00,'whole'),(122,14,'Russet Potato',1.00,'whole'),(123,14,'Cubed Butternut Squash',8.00,'oz'),(124,14,'Cream Sauce Base',4.00,'fl. oz'),(125,14,'Ciabatta',1.00,'whole'),(126,14,'Baby Spinach',2.00,'oz'),(127,14,'Shallot',1.00,'unit'),(128,14,'Shredded Cheddar-Jack Cheese',1.00,'oz'),(129,14,'Mirepoix Brother Concentrate',4.00,'tsp'),(130,14,'Butter',0.30,'oz'),(131,14,'Seasoned Salt Blend',1.00,'tsp'),(132,15,'Extra Firm Tofu',12.00,'oz'),(133,15,'Small Flour Tortillas',6.00,'whole'),(134,15,'Pineapple Chunks',3.00,'oz'),(135,15,'Teriyaki Glaze',2.00,'fl. oz'),(136,15,'Jalapeno Pepper',1.00,'whole'),(137,15,'Green Onions',2.00,'whole'),(138,15,'Cornstarch',2.00,'Tbsp.'),(139,15,'Cilantro',0.25,'oz'),(140,15,'Asian Garlic, Ginger & Chile Seasoning',1.00,'tsp'),(141,16,'Par Cooked Asian Noodles',20.00,'oz'),(142,16,'Ground Turkey',16.00,'oz'),(143,16,'Green Bell Pepper',1.00,'whole'),(144,16,'Matchstick Carrots',6.00,'oz'),(145,16,'Orange Ginger Seasme Sauce',6.00,'oz'),(146,16,'Peanut Butter',1.50,'oz'),(147,16,'Fried Rice Noodles',1.00,'oz'),(148,16,'Green Onions',2.00,'whole'),(149,16,'Minced Garlic and parley',2.00,'tsp'),(150,16,'Asian, Ginger & Chile Seasoning',2.00,'tsp'),(151,17,'Sirloin Steaks',12.00,'oz'),(152,17,'Yukon Potatoes',12.00,'oz'),(153,17,'Balsamic Glaze',1.50,'fl. oz'),(154,17,'Grated Parmesan Cheese',1.00,'oz'),(155,17,'Tuscan Herb Butter',0.80,'oz'),(156,17,'Crispy Onions',0.50,'oz'),(157,17,'Minced Garlic and Parsley',1.00,'Tbsp.'),(158,17,'Mushroom Seasoning',1.00,'tsp'),(159,17,'Thyme Sprigs',3.00,'whole'),(160,18,'Yellowtail Portions',10.00,'oz'),(161,18,'Mashed Potatoes',10.00,'oz'),(162,18,'Green Beans',8.00,'oz'),(163,18,'Cream Cheese',1.00,'oz'),(164,18,'Beurre Blanc Butter',1.00,'oz'),(165,18,'Green Onions',2.00,'whole'),(166,18,'Crumbled Bacon',0.50,'oz'),(167,18,'Garlic Pepper',2.00,'tsp'),(168,18,'Buttermilk-Dill Seasoning',1.00,'tsp'),(169,19,'Pork Tenderloin Medallions',12.00,'oz'),(170,19,'Green Beans',8.00,'oz'),(171,19,'Cremini Mushrooms',4.00,'oz'),(172,19,'Caramelized Onion jam',1.00,'oz'),(173,19,'Roasted Garlic & Herb Butter',0.75,'oz'),(174,19,'Chicken Demi-Glace Concentrate',2.00,'tsp'),(175,19,'Chive Sprigs',6.00,'whole'),(176,19,'Flour',0.25,'oz'),(177,19,'Garlic Salt',0.50,'tsp'),(178,19,'Coarse Black Pepper',0.50,'tsp'),(179,20,'Green Beans',12.00,'oz'),(180,20,'Boneless Skinless Chicken Breasts',12.00,'oz'),(181,20,'Lemon',1.00,'whole'),(182,20,'Pure Maple Syrup',1.00,'fl. oz'),(183,20,'Roasted Sliced Almonds',0.50,'oz'),(184,20,'Chive Sprigs',6.00,'whole'),(185,20,'Rotisserie Chicken Seasoning',0.50,'tsp'),(186,21,'Steak Strips',10.00,'oz'),(187,21,'Roma Tomato',1.00,'whole'),(188,21,'Arborio Rice',3.60,'oz'),(189,21,'Corn kernels',3.00,'oz'),(190,21,'Grated Parmesan Cheese',2.00,'oz'),(191,21,'Sour Cream',2.00,'oz'),(192,21,'Green Onions',2.00,'whole'),(193,21,'Natural Beef Flavor Demi-Glace Concentrate',2.00,'tsp'),(194,21,'Pot Roast Seasoning',1.50,'tsp'),(195,22,'Russet Potatoes',4.00,'whole'),(196,22,'Boneless Skinless Chicken Breast Cutlet',20.00,'oz'),(197,22,'Brioche Buns',4.00,'whole'),(198,22,'Slaw Mix',4.00,'oz'),(199,22,'Dill Pickle Slices',3.25,'oz'),(200,22,'BBQ Sauce',3.00,'oz'),(201,22,'Shredded Cheddar Cheese',2.00,'oz'),(202,22,'Buttermilk Ranch Dressing',1.50,'fl. oz'),(203,22,'Barbeque Seasoning',2.00,'tsp'),(204,22,'Garlic Salt',0.50,'tsp'),(205,23,'Cooked Gemelli Pasta',8.00,'oz'),(206,23,'Zucchini',1.00,'whole'),(207,23,'Marinara Sauce',4.00,'oz'),(208,23,'Mixed Diced Peppers',4.00,'oz'),(209,23,'Prosciutto',2.00,'oz'),(210,23,'Shredded Asiago Cheese',1.00,'oz'),(211,23,'Sicilian Sauce',1.00,'oz'),(212,23,'Panko Breadcrumbs',0.25,'cup'),(213,23,'Garlic Salt',0.50,'tsp'),(214,23,'Red Pepper Flakes',0.25,'tsp'),(215,24,'Boneless Skinless Chicken Breasts',12.00,'oz'),(216,24,'Zucchini',2.00,'whole'),(217,24,'Marinara Sauce',4.00,'oz'),(218,24,'Shredded Mozzarella',2.00,'oz'),(219,24,'Panko Breadcrumbs',0.50,'cup'),(220,24,'Shredded Parmesan Cheese',1.00,'oz'),(221,24,'Garlic Salt',0.50,'tsp'),(222,24,'Red Pepper Flakes',0.25,'tsp'),(223,25,'Steak Strips',8.00,'oz'),(224,25,'Arborio Rice',0.75,'cup'),(225,25,'Grape Tomatoes',4.00,'oz'),(226,25,'Shredded Asiago Cheese',2.00,'oz'),(227,25,'Basil Pesto',1.00,'oz'),(228,25,'Butter',0.60,'oz'),(229,25,'Green Onions',2.00,'whole'),(230,25,'Mirepoix Broth Concentrate',2.00,'tsp'),(231,25,'Garlic Cloves',2.00,'whole'),(232,25,'Garlic Salt',0.50,'tsp');
/*!40000 ALTER TABLE `recipe_ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `recipe_id` bigint NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `difficulty` varchar(45) DEFAULT NULL,
  `cook_time` varchar(45) DEFAULT NULL,
  `days_good` int DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `category_id` bigint NOT NULL,
  PRIMARY KEY (`recipe_id`),
  KEY `fk_category_idx` (`category_id`),
  CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `recipe_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (1,'Buttermilk Chicken Schnitzel','with cucumber-dill sauce and zucchini','Expert','25-35',5,'assets/images/recipes/chicken/1000.png',1),(2,'Orange-Seasame Pork Rice Bowl','with green onions and crispy wontons','Intermediate','25-35',5,'assets/images/recipes/pork/1000.png',2),(3,'One-Pan BBQ Ranch Pork Flautas','with cheddar and corn','Easy','25-35',6,'assets/images/recipes/pork/1001.png',2),(4,'Beef Cheddar Melt','with roasted potato wedges','Intermediate','30-40',6,'assets/images/recipes/beef/1000.png',3),(5,'Pine Nut Butter Chicken Breast','with garlic mashed potatoes and hone-rosemary carrots','Intermediate','50-60',5,'assets/images/recipes/chicken/1001.png',1),(6,'Spicy Petite Scallops Arrabbiate','with spaghetti and Asiago','Intermediate','20-30',3,'assets/images/recipes/seafood/1000.png',4),(7,'Salmon with Lemon Piccata Butter','and ratatouille zucchini ribbons','Intermediate','25-35',3,'assets/images/recipes/seafood/1001.png',4),(8,'Sweep and Spicy Shrimp Tacos','with poblano slaw and cotija','Easy','15-20',3,'assets/images/recipes/seafood/1002.png',4),(9,'Chipotle Pesto Beef Meatballs','with chile-cumin carrots and zucchini','Intermediate','35-45',5,'assets/images/recipes/beef/1001.png',3),(10,'Tomato Feta Trout','with buttermilk-dill zucchini and peppers','Easy','15-20',3,'assets/images/recipes/seafood/1003.png',4),(11,'Parmeasan-Crusted Turkey meatloaf','with buttery green beans amandine','Intermediate','35-45',5,'assets/images/recipes/turkey/1000.png',5),(12,'Chimichurri Pork Chop','with mashed sweet potato and carrots','Easy','15-20',3,'assets/images/recipes/pork/1002.png',2),(13,'Roasted Beet and Goat Cheese Risotto','with pistachios','Intermediate','35-45',7,'assets/images/recipes/vegetarian/1000.png',6),(14,'Potato and Butternut Squash Chowder','with cheesy bread','Intermediate','30-40',7,'assets/images/recipes/vegetarian/1001.png',6),(15,'One-Pan Crispy Teriyaki Tofu Tacos','with pineapple salsa','Intermediate','30-40',7,'assets/images/recipes/vegetarian/1002.png',6),(16,'One-Pot Thai-Style Peanut Turkey Noodles','with peppers and carrots','Easy','20-30',5,'assets/images/recipes/turkey/1001.png',5),(17,'Balsamic Butter Sirloin','with pan-roasted herbed potatoes','Intermediate','20-30',4,'assets/images/recipes/beef/1002.png',3),(18,'Beurre Blanc Butter Yellowtail','with mashed potatoes and bacon green beans','Easy','20-30',3,'assets/images/recipes/seafood/1004.png',4),(19,'Pork Medallions and Sweet Onion Demi','with garlic butter green beans and mushrooms','Intermediate','20-30',4,'assets/images/recipes/pork/1003.png',2),(20,'Rotisserie-Seasoned Chicken and Chives','with lemon-maple green beans','Easy','10-15',4,'assets/images/recipes/chicken/1002.png',1),(21,'Corn and Steak Strip Risotto','with fresh tomatoes','Intermediate','35-45',6,'assets/images/recipes/beef/1003.png',3),(22,'Chicken Cutlet and Pickle Sandwhich','with BBQ sauce and seasoned fries','Easy','40-50',5,'assets/images/recipes/chicken/1003.png',1),(23,'Spicy Sicilian-Style Prosciutto Gemelli','with Asiago and toasted breadcrumbs','Intermediate','10-15',4,'assets/images/recipes/beef/1004.png',3),(24,'Crispy Chicken Parmesan','with cheesy zucchini','Expert','35-45',5,'assets/images/recipes/chicken/1004.png',1),(25,'Steak Bruschetta Risotto','with Asiago and grap tomatoes','Intermediate','35-45',3,'assets/images/recipes/beef/1005.png',3),(26,'Mango Jalapeno Pork Chop','with bell pepper rice and lime','Intermediate','35-45',6,'assets/images/recipes/pork/1004.png',2),(27,'Three-Cheese Peppercorn Pork Meatloaf','with buttered green beans and peppers','Easy','40-50',4,'assets/images/recipes/pork/1005.png',2),(28,'Italian Sausage and Red Pepper Pasta','with Parmesean and peas','Easy','30-40',4,'assets/images/recipes/pork/1006.png',2),(29,'Beef Cheddar Melt','with roasted potato wedges','Intermediate','30-40',6,'assets/images/recipes/beef/1006.png',3),(30,'Creamy Beef Bolognese Stuffed Peppers','with mozzarella and Parmesan','Intermediate','35-45',5,'assets/images/recipes/beef/1007.png',3),(31,'Steakhouse Sirloin and Chive Aioli','with loaded roasted potatoes','Easy','30-40',4,'assets/images/recipes/beef/1008.png',3),(32,'Margherita Chicken','with garlic Parmesan zucchini','Easy','35-45',4,'assets/images/recipes/chicken/1005.png',1),(33,'Creamy Sun-Dried Tomato Chicken','with Parmesan green beans','Easy','35-45',4,'assets/images/recipes/chicken/1006.png',1),(34,'Jalapeno Popper Beef Sliders','with potatoes','Easy','10-15',4,'assets/images/recipes/beef/1009.png',3),(35,'Teriyaki Chicken Cutlet Sandwich','with chile-spiced fries','Intermediate','30-40',5,'assets/images/recipes/chicken/1007.png',1),(36,'One-Pan Turkey Burrito Skillet','with crispy tortilla strips','Easy','20-30',5,'assets/images/recipes/turkey/1002.png',5),(37,'Peach and Thyme-Glazed Pork Chop','with garlic and herb green beans','Easy','10-15',4,'assets/images/recipes/pork/1007.png',2),(38,'One-Pan Acapulco-Style Steak Quesadillas','with cheddar-jack cheese and pico de gallo','Intermediate','35-45',6,'assets/images/recipes/beef/1010.png',3),(39,'German-Style Ground Pork Flatbread','with mustard-cheese sauce and green onions','Intermediate','25-35',5,'assets/images/recipes/pork/1008.png',2),(40,'Spicy Chicken Taquitos','with sour cream and pico de gallo','Intermediate','50-60',5,'assets/images/recipes/chicken/1008.png',1),(41,'Chipotle Pesto Beef Meatballs','with chile-cumin carrots and zucchini','Intermediate','35-45',5,'assets/images/recipes/beef/1011.png',3),(42,'One-Pot Creamy Chicken Chowder','with poblano and crispy tortillas','Intermediate','25-35',5,'assets/images/recipes/chicken/1009.png',1),(43,'Mustard Pretzel-Crusted Chicken','with garlic and herb white cheddar mashed potatoes','Easy','30-40',4,'assets/images/recipes/chicken/1010.png',1),(44,'Cheesy Sliced Pork Quesadilla','with smoky sauce','Easy','10-15',4,'assets/images/recipes/pork/1009.png',2),(45,'Creamy Beef Bolognese Stuffed Peppers','with mozzarella and Parmesan','Intermediate','35-45',5,'assets/images/recipes/beef/1012.png',3),(46,'Spicy Buffalo-Style Chicken Pizza','with blue cheese and green onions','Intermediate','25-35',5,'assets/images/recipes/chicken/1011.png',1),(47,'Hawaiian-Style Tukey Burger','with Siracha-roasted sweet potatoes','Intermediate','25-35',5,'assets/images/recipes/turkey/1003.png',5),(48,'Crispy Chicken Parmesan','with cheesy zucchini','Expert','35-45',5,'assets/images/recipes/chicken/1012.png',1),(49,'Hawaiian-Style BBQ Pork Tacos','with pineapple and cashews','Easy','10-15',4,'assets/images/recipes/pork/1010.png',2),(50,'Creamy Salsa Verde Chicken','with chile and cumin green beans','Easy','35-45',4,'assets/images/recipes/chicken/1013.png',1),(51,'Beef Enchilada Flatbread','with mozzarella and green onions','Intermediate','25-35',6,'assets/images/recipes/beef/1013.png',3),(52,'Garlic Butter Steak','with loaded baked potato','Intermediate','60+',6,'assets/images/recipes/beef/1014.png',3),(53,'Pork and Poblana Flautas','with cilantro-lime crema and cotija','Easy','20-30',5,'assets/images/recipes/pork/1011.png',2),(54,'Mini Mediterranean-Style Cauliflower Wraps','with tzatziki crema','Easy','10-15',4,'assets/images/recipes/vegetarian/1003.png',6),(55,'Crunchy Pesto mozzarella Chicken','with roasted tomatoes and green beans','Easy','45-55',4,'assets/images/recipes/chicken/1014.png',1),(56,'Beef Pizza Meatballs','with roasted cauliflower','Easy','35-45',4,'assets/images/recipes/beef/1015.png',3),(57,'Triple-P Italian Sausage Stuffed Peppers','with pepperoni, panko, and Parmesan','Intermediate','40-50',5,'assets/images/recipes/pork/1012.png',2),(58,'Herbes de Provence Chicken','with glazed carrots and pecans','Expert','35-45',5,'assets/images/recipes/chicken/1015.png',1),(59,'Barbocoa Steak Tacos','with queso fresco','Easy','25-35',6,'assets/images/recipes/beef/1016.png',3),(60,'Jalapeno Popper-Stuffed Chicken','with crispy smashed potatoes','Expert','45-55',5,'assets/images/recipes/chicken/1016.png',1),(61,'Mozzarella-Stuffed Beef Meatloaf','with panko Parmesan zucchini','Easy','30-40',4,'assets/images/recipes/beef/1017.png',3),(62,'BBQ Mushroom Flatbread','with ranch drizzle and cilantro','Intermediate','20-30',7,'assets/images/recipes/vegetarian/1004.png',6),(63,'Corn and Steak Strip Risotto','with fresh tomatoes','Intermediate','35-45',6,'assets/images/recipes/beef/1018.png',3),(64,'Chile Maple Mustard-Glazed Pork Meatballs','with spiced carrots and zucchini','Intermediate','25-35',5,'assets/images/recipes/pork/1013.png',2),(65,'Chicken and Cheese Flautas','with pico de gallo','Intermediate','20-30',5,'assets/images/recipes/chicken/1017.png',1),(66,'Honey-Garlic Cauliflower Rice Bowl','with sesame seeds and green onions','Easy','10-15',4,'assets/images/recipes/vegetarian/1005.png',6),(67,'Creole-Style Turkey meatloaf','with garlic green beans and peppers','Easy','40-50',4,'assets/images/recipes/turkey/1004.png',5);
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'admin','admin@admin','$2a$10$a4GaMHPGFNcO1jfCRNAd8ePdVCuvvK8Aw4hHIFOnlvRbgNeLuUTu2');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weekly_meals`
--

DROP TABLE IF EXISTS `weekly_meals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weekly_meals` (
  `meal_id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` varchar(45) DEFAULT NULL,
  `recipe_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`meal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weekly_meals`
--

LOCK TABLES `weekly_meals` WRITE;
/*!40000 ALTER TABLE `weekly_meals` DISABLE KEYS */;
INSERT INTO `weekly_meals` VALUES (1,'3','test pizza'),(2,'4','test pizza 2');
/*!40000 ALTER TABLE `weekly_meals` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-21  5:55:57

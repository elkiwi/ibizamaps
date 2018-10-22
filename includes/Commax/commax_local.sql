-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 05, 2011 at 11:51 PM
-- Server version: 5.1.53
-- PHP Version: 5.3.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `commax_local`
--

-- --------------------------------------------------------

--
-- Table structure for table `commax_comments`
--

CREATE TABLE IF NOT EXISTS `commax_comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ref_id` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `parent` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `url` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `body` text COLLATE utf8_unicode_ci NOT NULL,
  `dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `show_it` tinyint(1) NOT NULL DEFAULT '1',
  `karma` int(11) NOT NULL DEFAULT '0',
  `dw_vote` int(11) NOT NULL DEFAULT '0',
  `up_vote` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `ref_id` (`ref_id`),
  KEY `parent` (`parent`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=292 ;

--
-- Dumping data for table `commax_comments`
--

INSERT INTO `commax_comments` (`id`, `ref_id`, `parent`, `name`, `url`, `email`, `body`, `dt`, `show_it`, `karma`, `dw_vote`, `up_vote`) VALUES
(291, '1', '-', 'Eduardo', 'http://www.voindo.eu/commax', 'eduvoindo@gmail.com', 'Hello. I would like to use this wonderful comment system to let me thank <strong>You for buying Commax!</strong><br /><br />Hope you enjoy it. Any doubts, drop me an email <img src="http://127.0.0.1/_APP_COMMAX/assets/img/emoticons/smile.png" width="16" height="16" align="absmiddle" /><br />Regards,<br />Eduardo<br /><br />', '2011-11-05 23:50:38', 1, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `commax_config`
--

CREATE TABLE IF NOT EXISTS `commax_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cfg_name` varchar(255) NOT NULL,
  `cfg_value` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Dumping data for table `commax_config`
--

INSERT INTO `commax_config` (`id`, `cfg_name`, `cfg_value`) VALUES
(1, 'maxnumchars', '7500'),
(2, 'Replymaxnumchars', '1000'),
(3, 'mod_comments', '1'),
(4, 'mid_range', '5'),
(5, 'default_ipp', '25'),
(6, 'conv_url_to_link', '1'),
(7, 'allowed_html', 'pre, strong, ol, ul, li'),
(8, 'blacklist', 'shit, crap'),
(9, 'display_order', 'ASC'),
(10, 'captcha_enabled', '1'),
(11, 'captcha_width', '130'),
(12, 'reg_users_only', '0'),
(13, 'karma_on', '0'),
(14, 'karma_type', 'cookie'),
(15, 'captcha_color1', '#78b4f0'),
(16, 'captcha_color2', '#888888'),
(17, 'captcha_color3', '#78b4f0'),
(18, 'captcha_colorbg', '');

-- --------------------------------------------------------

--
-- Table structure for table `commax_karma_voted`
--

CREATE TABLE IF NOT EXISTS `commax_karma_voted` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `com_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `commax_karma_voted`
--

INSERT INTO `commax_karma_voted` (`id`, `com_id`, `email`) VALUES
(1, 251, 'eduvoindo@gmail.com'),
(2, 243, 'eduvoindo@gmail.com');

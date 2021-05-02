
-- Database: `memory`
--
CREATE DATABASE IF NOT EXISTS `memory3` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `memory3`;
GRANT ALL ON `memory3`.* TO 'memory'@'%';
-- --------------------------------------------------------

--
-- Table structure for table `temps`
--

CREATE TABLE IF NOT EXISTS `temps` (
  `id` int NOT NULL,
  `temps` int NOT NULL DEFAULT '0',
  `date_partie` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `temps`
--
ALTER TABLE `temps`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `temps`
--
ALTER TABLE `temps`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

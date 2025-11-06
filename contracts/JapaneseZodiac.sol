// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract JapaneseZodiac {
    string[12] public signs = [
        "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake",
        "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"
    ];

    string[12] public japaneseNames = [
        "Ne", "Ushi", "Tora", "U", "Tatsu", "Mi",
        "Uma", "Hitsuji", "Saru", "Tori", "Inu", "I"
    ];

    function getZodiacSign(uint256 birthYear) public view returns (string memory sign, string memory japanese) {
        uint256 index = (birthYear - 4) % 12;
        return (signs[index], japaneseNames[index]);
    }

    function getZodiacFromDate(uint256 year, uint256 month, uint256 day) external view returns (string memory sign, string memory japanese) {
        // Japanese zodiac is based on lunar year, but we simplify with solar year
        // Adjust for Chinese New Year (approx Feb 4)
        uint256 adjustedYear = year;
        if (month == 1 || (month == 2 && day < 4)) {
            adjustedYear = year - 1;
        }
        return getZodiacSign(adjustedYear);
    }
}

var sports = ['tennis', 'volleyball', 'football', 'baseball'];
var shortNumber = {
    1: {
        iii: 'jnnnn',
        outcome_id: function (sport) {
            if ($.inArray(sport, sports) != -1)
                return 216;
            else
                return 190;
        },
        outcome_name: function (sport) {
            if ($.inArray(sport, sports) != -1)
                return 'coeff_CW_P1'
            else
                return 'coeff_FT_1'
        }
    },
    2: {
        outcome_id: function (sport) {
            if ($.inArray(sport, sports) != -1)
                return 217;
            else
                return 192;
        },
        outcome_name: function (sport) {
            if ($.inArray(sport, sports) != -1)
                return 'coeff_CW_P2'
            else
                return 'coeff_FT_2'
        }
    },
    3: {
        outcome_id: 191,
        outcome_name: 'coeff_FT_X'
    },
    4: {
        outcome_id: 496,
        outcome_name: 'coeff_DCFT_1X'
    },
    5: {
        outcome_id: 498,
        outcome_name: 'coeff_DCFT_12'
    },
    6: {
        outcome_id: 497,
        outcome_name: 'coeff_DCFT_X2'
    },
    7: {
        outcome_id: 1483,
        outcome_name: 'coeff_FT_TOTAL_2_TG'
        /*method: 'get_total_outcome_name'
         addition: 'G'
         value: 1.5*/
    },
    8: {
        outcome_id: 1484,
        outcome_name: 'coeff_FT_TOTAL_2_TL'
        /*method: 'get_total_outcome_name'
         addition: 'L'
         value: 1.5*/
    },
    9: {
        outcome_id: 193,
        outcome_name: 'coeff_FT_TG'
        /*method: 'get_total_outcome_name'
         addition: 'G'
         value: 2.5*/
    },
    10: {
        outcome_id: 194,
        outcome_name: 'coeff_FT_TL'
        /* method: 'get_total_outcome_name'
         addition: 'L'
         value: 2.5*/
    },
    11: {
        outcome_id: 1492,
        outcome_name: 'coeff_FT_TOTAL_5_TG',
        /* method: 'get_total_outcome_name'
         addition: 'G'
         value: 3.5*/
    },
    12: {
        outcome_id: 1493,
        outcome_name: 'coeff_FT_TOTAL_5_TL',
        /* method: 'get_total_outcome_name'
         addition: 'L'
         value: 3.5*/
    },
    13: {
        outcome_id: 1498,
        outcome_name: 'coeff_FT_TOTAL_7_TG',
        /*method: 'get_total_outcome_name'
         addition: 'G'
         value: 4.5*/
    },
    14: {
        outcome_id: 1499,
        outcome_name: 'coeff_FT_TOTAL_7_TL',
        /*method: 'get_total_outcome_name'
         addition: 'L'
         value: 4.5*/
    },
    15: {
        outcome_id: 2055,
        outcome_name: 'coeff_WHO_HIT_BH'
    },
    16: {
        outcome_id: 2056,
        outcome_name: 'coeff_WHO_HIT_NH'
    },
    17: {
        outcome_id: 198,
        outcome_name: 'coeff_HT1_1'
    },
    18: {
        outcome_id: 199,
        outcome_name: 'coeff_HT1_X'
    },
    19: {
        outcome_id: 200,
        outcome_name: 'coeff_HT1_2'
    },
    20: {
        outcome_id: 502,
        outcome_name: 'coeff_DCHT1_1X'
    },
    21: {
        outcome_id: 504,
        outcome_name: 'coeff_DCHT1_12'
    },
    22: {
        outcome_id: 503,
        outcome_name: 'coeff_DCHT1_X2'
    },
    23: {
        outcome_id: 206,
        outcome_name: 'coeff_HT2_1'
    },
    24: {
        outcome_id: 207,
        outcome_name: 'coeff_HT2_X'
    },
    25: {
        outcome_id: 208,
        outcome_name: 'coeff_HT2_2'
    },
    26: {
        outcome_id: 508,
        outcome_name: 'coeff_DCHT2_1X'
    },
    27: {
        outcome_id: 510,
        outcome_name: 'coeff_DCHT2_12'
    },
    28: {
        outcome_id: 509,
        outcome_name: 'coeff_DCHT2_X2'
    },
    29: {
        outcome_id: 2057,
        outcome_name: 'coeff_HIT_1_YES'
    },
    30: {
        outcome_id: 2058,
        outcome_name: 'coeff_HIT_1_NO'
    },
    31: {
        outcome_id: 2059,
        outcome_name: 'coeff_HIT_2_YES'
    },
    32: {
        outcome_id: 2060,
        outcome_name: 'coeff_HIT_2_NO'
    },
    33: {
        outcome_id: 1537,
        //method: 'get_total_half_outcome_name'
        outcome_name: 'coeff_HT1_TOTAL_0_TG'
        /*addition: 'G'
         value: 0.5*/
    },
    34: {
        outcome_id: 1538,
        //method: 'get_total_half_outcome_name'
        outcome_name: 'coeff_HT1_TOTAL_0_TL'
        /*addition: 'L'
         value: 0.5*/
    },
    35: {
        outcome_id: 1540,
        //method: 'get_total_half_outcome_name'
        outcome_name: 'coeff_HT1_TOTAL_1_TG'
        /*addition: 'G'
         value: 1.5*/
    },
    36: {
        outcome_id: 1541,
        //method: 'get_total_half_outcome_name'
        outcome_name: 'coeff_HT1_TOTAL_1_TL'
        /*addition: 'L'
         value: 1.5*/
    },
    37: {
        outcome_id: 1543,
        //method: 'get_total_half_outcome_name'
        outcome_name: 'coeff_HT1_TOTAL_2_TG'
        /*addition: 'G'
         value: 2.5*/
    },
    38: {
        outcome_id: 1544,
        //method: 'get_total_half_outcome_name'
        outcome_name: 'coeff_HT1_TOTAL_2_TL'
        /*addition: 'L'
         value: 2.5*/
    },
    39: {
        outcome_id: 1627,
        //method: 'get_total_half_outcome_name'
        outcome_name: 'coeff_HT2_TOTAL_0_TG'
        /*addition: 'G'
         value: 0.5*/
    },
    40: {
        outcome_id: 1628,
        //method: 'get_total_half_outcome_name'
        outcome_name: 'coeff_HT2_TOTAL_0_TL'
        /*addition: 'L'
         value: 0.5*/
    },
    41: {
        outcome_id: 1630,
        //method: 'get_total_half_outcome_name'
        outcome_name: 'coeff_HT2_TOTAL_1_TG'
        /*addition: 'G'
         value: 1.5*/
    },
    42: {
        outcome_id: 1631,
        // method: 'get_total_half_outcome_name'
        outcome_name: 'coeff_HT2_TOTAL_1_TL'
        /*addition: 'L'
         value: 1.5*/
    },
    43: {
        outcome_id: 1633,
        //method: 'get_total_half_outcome_name'
        outcome_name: 'coeff_HT2_TOTAL_2_TG'
        /*addition: 'G'
         value: 2.5*/
    },
    44: {
        outcome_id: 1634,
        //method: 'get_total_half_outcome_name'
        outcome_name: 'coeff_HT2_TOTAL_2_TL'
        /*addition: 'L'
         value: 2.5*/
    },
    45: {
        outcome_id: 2185,
        outcome_name: 'coeff_HOME_WIN_AND_TOTAL_LESS_2_5_YES'
    },
    46: {
        outcome_id: 2186,
        outcome_name: 'coeff_HOME_WIN_AND_TOTAL_LESS_2_5_NO'
    },
    47: {
        outcome_id: 2187,
        outcome_name: 'coeff_HOME_WIN_AND_TOTAL_MORE_2_5_YES'
    },
    48: {
        outcome_id: 2188,
        outcome_name: 'coeff_HOME_WIN_AND_TOTAL_MORE_2_5_NO'
    },
    49: {
        outcome_id: 2189,
        outcome_name: 'coeff_AWAY_WIN_AND_TOTAL_LESS_2_5_YES'
    },
    50: {
        outcome_id: 2190,
        outcome_name: 'coeff_AWAY_WIN_AND_TOTAL_LESS_2_5_NO'
    },
    51: {
        outcome_id: 2190,
        outcome_name: 'coeff_AWAY_WIN_AND_TOTAL_MORE_2_5_YES'
    },
    52: {
        outcome_id: 2190,
        outcome_name: 'coeff_AWAY_WIN_AND_TOTAL_MORE_2_5_NO'
    },
    53: {
        outcome_id: 853,
        outcome_name: 'coeff_HTFT_HH'
    },
    54: {
        outcome_id: 854,
        outcome_name: 'coeff_HTFT_HD'
    },
    55: {
        outcome_id: 855,
        outcome_name: 'coeff_HTFT_HA'
    },
    56: {
        outcome_id: 856,
        outcome_name: 'coeff_HTFT_DH'
    },
    57: {
        outcome_id: 857,
        outcome_name: 'coeff_HTFT_DD'
    },
    58: {
        outcome_id: 858,
        outcome_name: 'coeff_HTFT_DA'
    },
    59: {
        outcome_id: 861,
        outcome_name: 'coeff_HTFT_AA'
    },
    60: {
        outcome_id: 859,
        outcome_name: 'coeff_HTFT_AD'
    },
    61: {
        outcome_id: 860,
        outcome_name: 'coeff_HTFT_AH'
    }
};

Ext.define('A', {
    someMethod: function(){
        return 'a';
    }
});

Ext.define('B', (function(){
    var fn = function(){
        return 'b';
    };

    return {
        extend: 'A',

        someMethod: function(){
            return this.callParent() + fn();
        }
    }
})()
);
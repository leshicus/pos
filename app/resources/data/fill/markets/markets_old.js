[
    {"name": t('markets.main.noDraw'), "template": "simple_list", "sports": getSportWithDraw(), "rows": [
        {"title": "{H}", "name": "coeff_FT_1"},
        {"title": t('markets.main.draw'), "name": "coeff_FT_X"},
        {"title": "{A}", "name": "coeff_FT_2"},
        {"title": t('markets.main.oneWinDraw', {team: '{H}'}), "name": "coeff_DCFT_1X"},
        {"title": t('markets.main.twoWin'), "name": "coeff_DCFT_12"},
        {"title": t('markets.main.oneWinDraw', {team: '{A}'}), "name": "coeff_DCFT_X2"}
    ], "id": 1001, "group_id": 1, "dependencies": ["coeff_FT_1", "coeff_FT_X", "coeff_FT_2", "coeff_DCFT_1X", "coeff_DCFT_12", "coeff_DCFT_X2"]},

    {"name": t('markets.main.win'), "template": "simple_list", "sports": getAllSportSlugs(), "rows": [
        {"title": "{H}", "name": "coeff_CW_P1"},
        {"title": "{A}", "name": "coeff_CW_P2"}
    ], "id": 1002, "group_id": 1, "dependencies": ["coeff_CW_P1", "coeff_CW_P2"]},
    {
        "name": t('markets.main.pass'), "template": "simple_list", "rows": [
        {"title": t('markets.main.pass_home'), "name": "coeff_QS_1"},
        {"title": t('markets.main.pass_away'), "name": "coeff_QS_2"}
    ], "id": 1, "group_id": 1, "dependencies": ["coeff_QS_1", "coeff_QS_2"]
    },
    {
        "name": t('markets.main.outcome'), "template": "simple_list", "sports": ["hockey"], "rows": [
        {"title": t('markets.home_victory'), "name": "coeff_HQ_1"},
        {"title": t('markets.away_victory'), "name": "coeff_HQ_2"}
    ], "id": 2, "group_id": 1, "dependencies": ["coeff_HQ_1", "coeff_HQ_2"]
    },
    {
        "name": t('markets.exact_score'), "template": "column_list", "id": 3, "group_id": 1, "dependencies": [
        "coeff_EXACT_SCORE_1_0", "coeff_EXACT_SCORE_3_0_0", "coeff_EXACT_SCORE_3_0_1", "coeff_EXACT_SCORE_3_0_2",
        "coeff_EXACT_SCORE_3_0_3", "coeff_EXACT_SCORE_3_0_4", "coeff_EXACT_SCORE_3_1_0", "coeff_EXACT_SCORE_3_1_1",
        "coeff_EXACT_SCORE_3_1_2", "coeff_EXACT_SCORE_3_1_3", "coeff_EXACT_SCORE_3_1_4", "coeff_EXACT_SCORE_3_2_0",
        "coeff_EXACT_SCORE_3_2_1", "coeff_EXACT_SCORE_3_2_2", "coeff_EXACT_SCORE_3_2_3", "coeff_EXACT_SCORE_3_2_4",
        "coeff_EXACT_SCORE_3_3_0", "coeff_EXACT_SCORE_3_3_1", "coeff_EXACT_SCORE_3_3_2", "coeff_EXACT_SCORE_3_3_3",
        "coeff_EXACT_SCORE_3_3_4", "coeff_EXACT_SCORE_3_4_0", "coeff_EXACT_SCORE_3_4_1", "coeff_EXACT_SCORE_3_4_2",
        "coeff_EXACT_SCORE_3_4_3", "coeff_EXACT_SCORE_3_4_4", "coeff_EXACT_SCORE_MORE_4_GOALS",
        "coeff_EXACT_SCORE_3_MORE_3_GOALS"
    ], "columns": [
        {
            "title": "{H}", "rows": [
            {"title": "1-0", "name": "coeff_EXACT_SCORE_3_1_0"},
            {"title": "2-0", "name": "coeff_EXACT_SCORE_3_2_0"},
            {"title": "2-1", "name": "coeff_EXACT_SCORE_3_2_1"},
            {"title": "3-0", "name": "coeff_EXACT_SCORE_3_3_0"},
            {"title": "3-1", "name": "coeff_EXACT_SCORE_3_3_1"},
            {"title": "3-2", "name": "coeff_EXACT_SCORE_3_3_2"},
            {"title": "4-0", "name": "coeff_EXACT_SCORE_3_4_0"},
            {"title": "4-1", "name": "coeff_EXACT_SCORE_3_4_1"},
            {"title": "4-2", "name": "coeff_EXACT_SCORE_3_4_2"},
            {"title": "4-3", "name": "coeff_EXACT_SCORE_3_4_3"},
            {"title": t('markets.other_score', {goal: 4}), "name": "coeff_EXACT_SCORE_MORE_4_GOALS"},
            {"title": t('markets.other_score', {goal: 3}), "name": "coeff_EXACT_SCORE_3_MORE_3_GOALS"}
        ]
        },
        {
            "title": t('markets.draw'), "rows": [
            {"title": "0-0", "name": "coeff_EXACT_SCORE_3_0_0"},
            {"title": "1-1", "name": "coeff_EXACT_SCORE_3_1_1"},
            {"title": "2-2", "name": "coeff_EXACT_SCORE_3_2_2"},
            {"title": "3-3", "name": "coeff_EXACT_SCORE_3_3_3"},
            {"title": "4-4", "name": "coeff_EXACT_SCORE_3_4_4"}
        ]
        },
        {
            "title": "{A}", "rows": [
            {"title": "0-1", "name": "coeff_EXACT_SCORE_3_0_1"},
            {"title": "0-2", "name": "coeff_EXACT_SCORE_3_0_2"},
            {"title": "0-3", "name": "coeff_EXACT_SCORE_3_0_3"},
            {"title": "0-4", "name": "coeff_EXACT_SCORE_3_0_4"},
            {"title": "1-2", "name": "coeff_EXACT_SCORE_3_1_2"},
            {"title": "1-3", "name": "coeff_EXACT_SCORE_3_1_3"},
            {"title": "1-4", "name": "coeff_EXACT_SCORE_3_1_4"},
            {"title": "2-3", "name": "coeff_EXACT_SCORE_3_2_3"},
            {"title": "2-4", "name": "coeff_EXACT_SCORE_3_2_4"},
            {"title": "3-4", "name": "coeff_EXACT_SCORE_3_3_4"}
        ]
        }
    ]
    },
    {
        "name": t('markets.exact_score'), "sports": [
        "volleyball", "tennis"
    ], "template": "column_list", "id": 4, "group_id": 1, "dependencies": [
        "coeff_EXACT_SCORE_TENNIS_3_0_0", "coeff_EXACT_SCORE_TENNIS_3_0_1", "coeff_EXACT_SCORE_TENNIS_3_0_2",
        "coeff_EXACT_SCORE_TENNIS_3_0_3", "coeff_EXACT_SCORE_TENNIS_3_1_0", "coeff_EXACT_SCORE_TENNIS_3_1_1",
        "coeff_EXACT_SCORE_TENNIS_3_1_2", "coeff_EXACT_SCORE_TENNIS_3_1_3", "coeff_EXACT_SCORE_TENNIS_3_2_0",
        "coeff_EXACT_SCORE_TENNIS_3_2_1", "coeff_EXACT_SCORE_TENNIS_3_2_2", "coeff_EXACT_SCORE_TENNIS_3_2_3",
        "coeff_EXACT_SCORE_TENNIS_3_3_0", "coeff_EXACT_SCORE_TENNIS_3_3_1", "coeff_EXACT_SCORE_TENNIS_3_3_2",
        "coeff_EXACT_SCORE_TENNIS_3_3_3", "coeff_EXACT_SCORE_TENNIS_0_0", "coeff_EXACT_SCORE_TENNIS_0_1",
        "coeff_EXACT_SCORE_TENNIS_0_2", "coeff_EXACT_SCORE_TENNIS_0_3", "coeff_EXACT_SCORE_TENNIS_1_0",
        "coeff_EXACT_SCORE_TENNIS_1_1", "coeff_EXACT_SCORE_TENNIS_1_2", "coeff_EXACT_SCORE_TENNIS_1_3",
        "coeff_EXACT_SCORE_TENNIS_2_0", "coeff_EXACT_SCORE_TENNIS_2_1", "coeff_EXACT_SCORE_TENNIS_2_2",
        "coeff_EXACT_SCORE_TENNIS_2_3", "coeff_EXACT_SCORE_TENNIS_3_0", "coeff_EXACT_SCORE_TENNIS_3_1",
        "coeff_EXACT_SCORE_TENNIS_3_2", "coeff_EXACT_SCORE_TENNIS_3_3"
    ], "columns": [
        {
            "title": "{H}", "rows": [
            {"title": "1-0", "name": "coeff_EXACT_SCORE_TENNIS_3_1_0"},
            {"title": "2-0", "name": "coeff_EXACT_SCORE_TENNIS_3_2_0"},
            {"title": "2-1", "name": "coeff_EXACT_SCORE_TENNIS_3_2_1"},
            {"title": "3-0", "name": "coeff_EXACT_SCORE_TENNIS_3_3_0"},
            {"title": "3-1", "name": "coeff_EXACT_SCORE_TENNIS_3_3_1"},
            {"title": "3-2", "name": "coeff_EXACT_SCORE_TENNIS_3_3_2"}
        ]
        },
//      {"title": t('markets.draw'), "rows": [
//        {"title": "0-0", "name": "coeff_EXACT_SCORE_TENNIS_3_0_0"},
//        {"title": "1-1", "name": "coeff_EXACT_SCORE_TENNIS_3_1_1"},
//        {"title": "2-2", "name": "coeff_EXACT_SCORE_TENNIS_3_2_2"},
//        {"title": "3-3", "name": "coeff_EXACT_SCORE_TENNIS_3_3_3"}
//      ]},
        {
            "title": "{A}", "rows": [
            {"title": "0-1", "name": "coeff_EXACT_SCORE_TENNIS_3_0_1"},
            {"title": "0-2", "name": "coeff_EXACT_SCORE_TENNIS_3_0_2"},
            {"title": "0-3", "name": "coeff_EXACT_SCORE_TENNIS_3_0_3"},
            {"title": "1-2", "name": "coeff_EXACT_SCORE_TENNIS_3_1_2"},
            {"title": "1-3", "name": "coeff_EXACT_SCORE_TENNIS_3_1_3"},
            {"title": "2-3", "name": "coeff_EXACT_SCORE_TENNIS_3_2_3"}
        ]
        }
    ]
    },
    {
        "name": t('markets.exact_score'), "sports": [
        "table_tennis"
    ], "template": "column_list", "id": 5, "group_id": 1, "dependencies": [
        "coeff_EXACT_SCORE_TENNIS_3_0_0", "coeff_EXACT_SCORE_TENNIS_3_0_1", "coeff_EXACT_SCORE_TENNIS_3_0_2",
        "coeff_EXACT_SCORE_TENNIS_3_0_3", "coeff_EXACT_SCORE_TENNIS_3_1_0", "coeff_EXACT_SCORE_TENNIS_3_1_1",
        "coeff_EXACT_SCORE_TENNIS_3_1_2", "coeff_EXACT_SCORE_TENNIS_3_1_3", "coeff_EXACT_SCORE_TENNIS_3_2_0",
        "coeff_EXACT_SCORE_TENNIS_3_2_1", "coeff_EXACT_SCORE_TENNIS_3_2_2", "coeff_EXACT_SCORE_TENNIS_3_2_3",
        "coeff_EXACT_SCORE_TENNIS_3_3_0", "coeff_EXACT_SCORE_TENNIS_3_3_1", "coeff_EXACT_SCORE_TENNIS_3_3_2",
        "coeff_EXACT_SCORE_TENNIS_3_3_3", "coeff_EXACT_SCORE_TENNIS_0_0", "coeff_EXACT_SCORE_TENNIS_0_1",
        "coeff_EXACT_SCORE_TENNIS_0_2", "coeff_EXACT_SCORE_TENNIS_0_3", "coeff_EXACT_SCORE_TENNIS_1_0",
        "coeff_EXACT_SCORE_TENNIS_1_1", "coeff_EXACT_SCORE_TENNIS_1_2", "coeff_EXACT_SCORE_TENNIS_1_3",
        "coeff_EXACT_SCORE_TENNIS_2_0", "coeff_EXACT_SCORE_TENNIS_2_1", "coeff_EXACT_SCORE_TENNIS_2_2",
        "coeff_EXACT_SCORE_TENNIS_2_3", "coeff_EXACT_SCORE_TENNIS_3_0", "coeff_EXACT_SCORE_TENNIS_3_1",
        "coeff_EXACT_SCORE_TENNIS_3_2", "coeff_EXACT_SCORE_TENNIS_3_3"
    ], "columns": [
        {
            "title": "{H}", "rows": [
            {"title": "1-0", "name": "coeff_EXACT_SCORE_TENNIS_3_1_0"},
            {"title": "2-0", "name": "coeff_EXACT_SCORE_TENNIS_3_2_0"},
            {"title": "2-1", "name": "coeff_EXACT_SCORE_TENNIS_3_2_1"},
            {"title": "3-0", "name": "coeff_EXACT_SCORE_TENNIS_3_3_0"},
            {"title": "3-1", "name": "coeff_EXACT_SCORE_TENNIS_3_3_1"},
            {"title": "3-2", "name": "coeff_EXACT_SCORE_TENNIS_3_3_2"}
        ]
        },
        {
            "title": t('markets.draw'), "rows": [
            {"title": "0-0", "name": "coeff_EXACT_SCORE_TENNIS_3_0_0"},
            {"title": "1-1", "name": "coeff_EXACT_SCORE_TENNIS_3_1_1"},
            {"title": "2-2", "name": "coeff_EXACT_SCORE_TENNIS_3_2_2"},
            {"title": "3-3", "name": "coeff_EXACT_SCORE_TENNIS_3_3_3"}
        ]
        },
        {
            "title": "{A}", "rows": [
            {"title": "0-1", "name": "coeff_EXACT_SCORE_TENNIS_3_0_1"},
            {"title": "0-2", "name": "coeff_EXACT_SCORE_TENNIS_3_0_2"},
            {"title": "0-3", "name": "coeff_EXACT_SCORE_TENNIS_3_0_3"},
            {"title": "1-2", "name": "coeff_EXACT_SCORE_TENNIS_3_1_2"},
            {"title": "1-3", "name": "coeff_EXACT_SCORE_TENNIS_3_1_3"},
            {"title": "2-3", "name": "coeff_EXACT_SCORE_TENNIS_3_2_3"}
        ]
        }
    ]
    },
    {
        "name": t('markets.main.victory_style'),
        "template": "groupped_yes_no_list",
        "sports": ["soccer"],
        "groups": [
            {
                "name": t('markets.home_victory'), "mnemonics": [
                {"title": t('markets.main.to_nil'), "name": "coeff_WIN_HOME_NO_AWAY_GOALS_"},
                {"title": t('markets.main.one_goal'), "name": "coeff_WIN_HOME_EXACTLY_BY_1_"},
                {"title": t('markets.main.two_goals'), "name": "coeff_WIN_HOME_EXACTLY_BY_2_"},
                {"title": t('markets.main.three_goals'), "name": "coeff_WIN_HOME_EXACTLY_BY_3_"},
                {"title": t('markets.main.volitional'), "name": "coeff_HOME_VOLITIONAL_WIN_"}
            ]
            },
            {
                "name": t('markets.away_victory'), "mnemonics": [
                {"title": t('markets.main.to_nil'), "name": "coeff_WIN_AWAY_NO_HOME_GOALS_"},
                {"title": t('markets.main.one_goal'), "name": "coeff_WIN_AWAY_EXACTLY_BY_1_"},
                {"title": t('markets.main.two_goals'), "name": "coeff_WIN_AWAY_EXACTLY_BY_2_"},
                {"title": t('markets.main.three_goals'), "name": "coeff_WIN_AWAY_EXACTLY_BY_3_"},
                {"title": t('markets.main.volitional'), "name": "coeff_AWAY_VOLITIONAL_WIN_"}
            ]
            },
            {
                "name": t('markets.main.draw_wg'), "mnemonics": [
                {"title": t('markets.main.draw_wg'), "name": "coeff_DRAW_WITH_GOALS_"}
            ]
            }
        ],
        "id": 6,
        "group_id": 1,
        "dependencies": [
            "coeff_WIN_HOME_NO_AWAY_GOALS_YES", "coeff_WIN_HOME_NO_AWAY_GOALS_NO",
            "coeff_WIN_HOME_EXACTLY_BY_1_YES", "coeff_WIN_HOME_EXACTLY_BY_1_NO", "coeff_WIN_HOME_EXACTLY_BY_2_YES",
            "coeff_WIN_HOME_EXACTLY_BY_2_NO", "coeff_WIN_HOME_EXACTLY_BY_3_YES", "coeff_WIN_HOME_EXACTLY_BY_3_NO",
            "coeff_HOME_VOLITIONAL_WIN_YES", "coeff_HOME_VOLITIONAL_WIN_NO", "coeff_WIN_AWAY_NO_HOME_GOALS_YES",
            "coeff_WIN_AWAY_NO_HOME_GOALS_NO", "coeff_WIN_AWAY_EXACTLY_BY_1_YES", "coeff_WIN_AWAY_EXACTLY_BY_1_NO",
            "coeff_WIN_AWAY_EXACTLY_BY_2_YES", "coeff_WIN_AWAY_EXACTLY_BY_2_NO", "coeff_WIN_AWAY_EXACTLY_BY_3_YES",
            "coeff_WIN_AWAY_EXACTLY_BY_3_NO", "coeff_AWAY_VOLITIONAL_WIN_YES", "coeff_AWAY_VOLITIONAL_WIN_NO",
            "coeff_DRAW_WITH_GOALS_YES", "coeff_DRAW_WITH_GOALS_NO"
        ]
    },
    {
        "name": t('markets.main.victory_or_draw'),
        "template": "yes_no_list",
        "sports": ["soccer", "hockey", "ball_hockey", "olympic_games"],
        "rows": [
            {"title": t('markets.home_victory_one_ball_or_draw'), "name": "coeff_WIN_HOME_BY_1_OR_DRAW_"},
            {"title": t('markets.away_victory_one_ball_or_draw'), "name": "coeff_WIN_AWAY_BY_1_OR_DRAW_"}
        ],
        "id": 7,
        "group_id": 1,
        "dependencies": [
            "coeff_WIN_HOME_BY_1_OR_DRAW_YES", "coeff_WIN_HOME_BY_1_OR_DRAW_NO",
            "coeff_WIN_AWAY_BY_1_OR_DRAW_YES", "coeff_WIN_AWAY_BY_1_OR_DRAW_NO"
        ]
    },
    {
        "name": t('markets.main.time_match'), "sports": [
        "soccer"
    ], "template": "simple_list", "rows": [
        {"title": t('markets.soccer.home_fh_win'), "name": "coeff_HTFT_HH"},
        {"title": t('markets.soccer.home_fh_draw'), "name": "coeff_HTFT_HD"},
        {"title": t('markets.soccer.home_fh_lose'), "name": "coeff_HTFT_HA"},
        {"title": t('markets.soccer.draw_fh_home_win'), "name": "coeff_HTFT_DH"},
        {"title": t('markets.soccer.draw_fh_draw'), "name": "coeff_HTFT_DD"},
        {"title": t('markets.soccer.draw_fh_home_lose'), "name": "coeff_HTFT_DA"},
        {"title": t('markets.soccer.away_fh_win'), "name": "coeff_HTFT_AA"},
        {"title": t('markets.soccer.away_fh_draw'), "name": "coeff_HTFT_AD"},
        {"title": t('markets.soccer.away_fh_lose'), "name": "coeff_HTFT_AH"}
    ], "id": 8, "group_id": 1, "dependencies": [
        "coeff_HTFT_HH", "coeff_HTFT_HD", "coeff_HTFT_HA", "coeff_HTFT_DH",
        "coeff_HTFT_DD", "coeff_HTFT_DA", "coeff_HTFT_AA", "coeff_HTFT_AD", "coeff_HTFT_AH"
    ]
    },
    {
        "name": t('markets.main.first_half'), "sports": [
        "basketball"
    ], "template": "simple_list", "rows": [
        {"title": t('markets.basketball.home_fh_win'), "name": "coeff_HTFT_HH"},
        {"title": t('markets.basketball.home_fh_draw'), "name": "coeff_HTFT_HD"},
        {"title": t('markets.basketball.home_fh_lose'), "name": "coeff_HTFT_HA"},
        {"title": t('markets.basketball.draw_fh_home_win'), "name": "coeff_HTFT_DH"},
        {"title": t('markets.basketball.draw_fh_draw'), "name": "coeff_HTFT_DD"},
        {"title": t('markets.basketball.draw_fh_home_lose'), "name": "coeff_HTFT_DA"},
        {"title": t('markets.basketball.away_fh_win'), "name": "coeff_HTFT_AA"},
        {"title": t('markets.basketball.away_fh_draw'), "name": "coeff_HTFT_AD"},
        {"title": t('markets.basketball.away_fh_lose'), "name": "coeff_HTFT_AH"}
    ], "id": 9, "group_id": 1, "dependencies": [
        "coeff_HTFT_HH", "coeff_HTFT_HD", "coeff_HTFT_HA", "coeff_HTFT_DH",
        "coeff_HTFT_DD", "coeff_HTFT_DA", "coeff_HTFT_AA", "coeff_HTFT_AD", "coeff_HTFT_AH"
    ]
    },
    {
        "name": t('markets.soccer.w_more_goals'),
        "sports": [
            "soccer"
        ],
        "template": "simple_list",
        "id": 10,
        "group_id": 1,
        "dependencies": ["coeff_T1T2_T1GT2", "coeff_T1T2_T1ET2", "coeff_T1T2_T1LT2"],
        "rows": [
            {"title": t('markets.soccer.f_time'), "name": "coeff_T1T2_T1GT2"},
            {"title": t('markets.soccer.same'), "name": "coeff_T1T2_T1ET2"},
            {"title": t('markets.soccer.s_time'), "name": "coeff_T1T2_T1LT2"}
        ]
    },
    {
        "name": t('markets.soccer.outcome_total'), "sports": [
        "soccer"
    ], "template": "yes_no_list", "rows": [
        {"title": t('markets.soccer.home_win_l25'), "name": "coeff_HOME_WIN_AND_TOTAL_LESS_2_5_"},
        {"title": t('markets.soccer.home_win_g25'), "name": "coeff_HOME_WIN_AND_TOTAL_MORE_2_5_"},
        {"title": t('markets.soccer.away_win_l25'), "name": "coeff_AWAY_WIN_AND_TOTAL_LESS_2_5_"},
        {"title": t('markets.soccer.away_win_g25'), "name": "coeff_AWAY_WIN_AND_TOTAL_MORE_2_5_"},
        {"title": t('markets.soccer.draw_l25'), "name": "coeff_DRAW_AND_TOTAL_LESS_2_5_"},
        {"title": t('markets.soccer.draw_g25'), "name": "coeff_DRAW_AND_TOTAL_MORE_2_5_"},
        {"title": t('markets.soccer.home_no_lose_l25'), "name": "coeff_HOME_NOT_LOST_AND_TOTAL_LESS_2_5_"},
        {"title": t('markets.soccer.home_no_lose_g25'), "name": "coeff_HOME_NOT_LOST_AND_TOTAL_MORE_2_5_"},
        {"title": t('markets.soccer.away_no_lose_l25'), "name": "coeff_AWAY_NOT_LOST_AND_TOTAL_LESS_2_5_"},
        {"title": t('markets.soccer.away_no_lose_g25'), "name": "coeff_AWAY_NOT_LOST_AND_TOTAL_MORE_2_5_"}
    ], "id": 11, "group_id": 1, "dependencies": [
        "coeff_HOME_WIN_AND_TOTAL_LESS_2_5_YES",
        "coeff_HOME_WIN_AND_TOTAL_LESS_2_5_NO", "coeff_HOME_WIN_AND_TOTAL_MORE_2_5_YES",
        "coeff_HOME_WIN_AND_TOTAL_MORE_2_5_NO", "coeff_AWAY_WIN_AND_TOTAL_LESS_2_5_YES",
        "coeff_AWAY_WIN_AND_TOTAL_LESS_2_5_NO", "coeff_AWAY_WIN_AND_TOTAL_MORE_2_5_YES",
        "coeff_AWAY_WIN_AND_TOTAL_MORE_2_5_NO", "coeff_DRAW_AND_TOTAL_LESS_2_5_YES", "coeff_DRAW_AND_TOTAL_LESS_2_5_NO",
        "coeff_DRAW_AND_TOTAL_MORE_2_5_YES", "coeff_DRAW_AND_TOTAL_MORE_2_5_NO",
        "coeff_HOME_NOT_LOST_AND_TOTAL_LESS_2_5_YES", "coeff_HOME_NOT_LOST_AND_TOTAL_LESS_2_5_NO",
        "coeff_HOME_NOT_LOST_AND_TOTAL_MORE_2_5_YES", "coeff_HOME_NOT_LOST_AND_TOTAL_MORE_2_5_NO",
        "coeff_AWAY_NOT_LOST_AND_TOTAL_LESS_2_5_YES", "coeff_AWAY_NOT_LOST_AND_TOTAL_LESS_2_5_NO",
        "coeff_AWAY_NOT_LOST_AND_TOTAL_MORE_2_5_YES", "coeff_AWAY_NOT_LOST_AND_TOTAL_MORE_2_5_NO"
    ]
    },
    {
        "name": t('markets.add_time'), "sports": [
        "basketball"
    ], "template": "yes_no_list", "rows": [
        {"title": t('markets.added_time'), "name": "coeff_OVERTIME_"}
    ], "id": 12, "group_id": 1, "dependencies": ["coeff_OVERTIME_YES", "coeff_OVERTIME_NO"]
    },
    {
        "name": t('markets.soccer.oc_times'), "sports": [
        "soccer"
    ], "template": "groupped_yes_no_list", "groups": [
        {
            "name": "{H}", "mnemonics": [
            {"title": t('markets.soccer.both_times'), "name": "coeff_HOME_WIN_BOTH_HT_"},
            {"title": t('markets.soccer.one_time'), "name": "coeff_WIN_HOME_ANY_HT_"}
        ]
        },
        {
            "name": "{A}", "mnemonics": [
            {"title": t('markets.soccer.both_times'), "name": "coeff_AWAY_WIN_BOTH_HT_"},
            {"title": t('markets.soccer.one_time'), "name": "coeff_WIN_AWAY_ANY_HT_"}
        ]
        },
        {
            "name": t('markets.draw'), "mnemonics": [
            {"title": t('markets.soccer.draw_one_time'), "name": "coeff_DRAW_IN_ANY_HT_"}
        ]
        }
    ], "id": 13, "group_id": 1, "dependencies": [
        "coeff_HOME_WIN_BOTH_HT_YES", "coeff_HOME_WIN_BOTH_HT_NO",
        "coeff_WIN_HOME_ANY_HT_YES", "coeff_WIN_HOME_ANY_HT_NO", "coeff_AWAY_WIN_BOTH_HT_YES",
        "coeff_AWAY_WIN_BOTH_HT_NO", "coeff_WIN_AWAY_ANY_HT_YES", "coeff_WIN_AWAY_ANY_HT_NO",
        "coeff_DRAW_IN_ANY_HT_YES", "coeff_DRAW_IN_ANY_HT_NO"
    ]
    },
    {
        "name": t('markets.main.result.title'), "sports": [
        "soccer", "hockey", "ball_hockey", "olympic_games"
    ], "template": "simple_list", "rows": [
        {
            "name": "coeff_MATCH_DECISION_HOME_WIN_MAIN_TIME",
            "title": t('markets.main.result.home_win_main_time')
        },
        {
            "name": "coeff_MATCH_DECISION_AWAY_WIN_MAIN_TIME",
            "title": t('markets.main.result.away_win_main_time')
        },
        {"name": "coeff_MATCH_DECISION_HOME_WIN_OVERTIME", "title": t('markets.main.result.home_win_overtime')},
        {"name": "coeff_MATCH_DECISION_AWAY_WIN_OVERTIME", "title": t('markets.main.result.away_win_overtime')},
        {"name": "coeff_MATCH_DECISION_HOME_WIN_PENALTY", "title": t('markets.main.result.home_win_penalty')},
        {"name": "coeff_MATCH_DECISION_AWAY_WIN_PENALTY", "title": t('markets.main.result.away_win_penalty')}
    ], "id": 14, "group_id": 1, "dependencies": [
        "coeff_MATCH_DECISION_HOME_WIN_MAIN_TIME",
        "coeff_MATCH_DECISION_AWAY_WIN_MAIN_TIME", "coeff_MATCH_DECISION_HOME_WIN_OVERTIME",
        "coeff_MATCH_DECISION_AWAY_WIN_OVERTIME", "coeff_MATCH_DECISION_HOME_WIN_PENALTY",
        "coeff_MATCH_DECISION_AWAY_WIN_PENALTY"
    ]
    },
    {
        "name": t('markets.main.points'), "sports": [
        "soccer", "hockey"
    ], "template": "groupped_yes_no_list", "groups": [
        {
            "name": "{H}", "mnemonics": [
            {"title": t('markets.more_than', {number: 1.5}), "name": "coeff_TOTAL_POINTS_HOME_MORE_1_5_"},
            {"title": t('markets.more_than', {number: 2.5}), "name": "coeff_TOTAL_POINTS_HOME_MORE_2_5_"},
            {"title": t('markets.more_than', {number: 3.5}), "name": "coeff_TOTAL_POINTS_HOME_MORE_3_5_"},
            {"title": t('markets.more_than', {number: 4.5}), "name": "coeff_TOTAL_POINTS_HOME_MORE_4_5_"},
            {"title": t('markets.more_than', {number: 5.5}), "name": "coeff_TOTAL_POINTS_HOME_MORE_5_5_"},
            {"title": t('markets.more_than', {number: 6.5}), "name": "coeff_TOTAL_POINTS_HOME_MORE_6_5_"},
            {"title": t('markets.more_than', {number: 7.5}), "name": "coeff_TOTAL_POINTS_HOME_MORE_7_5_"}
        ]
        },
        {
            "name": "{A}", "mnemonics": [
            {"title": t('markets.more_than', {number: 1.5}), "name": "coeff_TOTAL_POINTS_AWAY_MORE_1_5_"},
            {"title": t('markets.more_than', {number: 2.5}), "name": "coeff_TOTAL_POINTS_AWAY_MORE_2_5_"},
            {"title": t('markets.more_than', {number: 3.5}), "name": "coeff_TOTAL_POINTS_AWAY_MORE_3_5_"},
            {"title": t('markets.more_than', {number: 4.5}), "name": "coeff_TOTAL_POINTS_AWAY_MORE_4_5_"},
            {"title": t('markets.more_than', {number: 5.5}), "name": "coeff_TOTAL_POINTS_AWAY_MORE_5_5_"},
            {"title": t('markets.more_than', {number: 6.5}), "name": "coeff_TOTAL_POINTS_AWAY_MORE_6_5_"},
            {"title": t('markets.more_than', {number: 7.5}), "name": "coeff_TOTAL_POINTS_AWAY_MORE_7_5_"}
        ]
        }
    ], "id": 15, "group_id": 1, "dependencies": [
        "coeff_TOTAL_POINTS_HOME_MORE_1_5_YES",
        "coeff_TOTAL_POINTS_HOME_MORE_1_5_NO", "coeff_TOTAL_POINTS_HOME_MORE_2_5_YES",
        "coeff_TOTAL_POINTS_HOME_MORE_2_5_NO", "coeff_TOTAL_POINTS_HOME_MORE_3_5_YES",
        "coeff_TOTAL_POINTS_HOME_MORE_3_5_NO", "coeff_TOTAL_POINTS_HOME_MORE_4_5_YES",
        "coeff_TOTAL_POINTS_HOME_MORE_4_5_NO", "coeff_TOTAL_POINTS_HOME_MORE_5_5_YES",
        "coeff_TOTAL_POINTS_HOME_MORE_5_5_NO", "coeff_TOTAL_POINTS_HOME_MORE_6_5_YES",
        "coeff_TOTAL_POINTS_HOME_MORE_6_5_NO", "coeff_TOTAL_POINTS_HOME_MORE_7_5_YES",
        "coeff_TOTAL_POINTS_HOME_MORE_7_5_NO", "coeff_TOTAL_POINTS_AWAY_MORE_1_5_YES",
        "coeff_TOTAL_POINTS_AWAY_MORE_1_5_NO", "coeff_TOTAL_POINTS_AWAY_MORE_2_5_YES",
        "coeff_TOTAL_POINTS_AWAY_MORE_2_5_NO", "coeff_TOTAL_POINTS_AWAY_MORE_3_5_YES",
        "coeff_TOTAL_POINTS_AWAY_MORE_3_5_NO", "coeff_TOTAL_POINTS_AWAY_MORE_4_5_YES",
        "coeff_TOTAL_POINTS_AWAY_MORE_4_5_NO", "coeff_TOTAL_POINTS_AWAY_MORE_5_5_YES",
        "coeff_TOTAL_POINTS_AWAY_MORE_5_5_NO", "coeff_TOTAL_POINTS_AWAY_MORE_6_5_YES",
        "coeff_TOTAL_POINTS_AWAY_MORE_6_5_NO", "coeff_TOTAL_POINTS_AWAY_MORE_7_5_YES",
        "coeff_TOTAL_POINTS_AWAY_MORE_7_5_NO"
    ]
    },
    {
        "name": t('markets.main.place_in_group'), "sports": [
        "soccer", "hockey"
    ], "template": "groupped_yes_no_list", "groups": [
        {
            "name": "{H}", "mnemonics": [
            {"title": t('markets.main.places.2'), "name": "coeff_HOME_PLACE_IN_GROUP_2_"},
            {"title": t('markets.main.places.3'), "name": "coeff_HOME_PLACE_IN_GROUP_3_"},
            {"title": t('markets.main.places.4'), "name": "coeff_HOME_PLACE_IN_GROUP_4_"}
        ]
        },
        {
            "name": "{A}", "mnemonics": [
            {"title": t('markets.main.places.2'), "name": "coeff_AWAY_PLACE_IN_GROUP_2_"},
            {"title": t('markets.main.places.3'), "name": "coeff_AWAY_PLACE_IN_GROUP_3_"},
            {"title": t('markets.main.places.4'), "name": "coeff_AWAY_PLACE_IN_GROUP_4_"}
        ]
        }
    ], "id": 16, "group_id": 1, "dependencies": [
        "coeff_HOME_PLACE_IN_GROUP_2_YES", "coeff_HOME_PLACE_IN_GROUP_2_NO",
        "coeff_HOME_PLACE_IN_GROUP_3_YES", "coeff_HOME_PLACE_IN_GROUP_3_NO", "coeff_HOME_PLACE_IN_GROUP_4_YES",
        "coeff_HOME_PLACE_IN_GROUP_4_NO", "coeff_AWAY_PLACE_IN_GROUP_2_YES", "coeff_AWAY_PLACE_IN_GROUP_2_NO",
        "coeff_AWAY_PLACE_IN_GROUP_3_YES", "coeff_AWAY_PLACE_IN_GROUP_3_NO", "coeff_AWAY_PLACE_IN_GROUP_4_YES",
        "coeff_AWAY_PLACE_IN_GROUP_4_NO"
    ]
    },
    {
        "name": t('markets.main.place_in_tournament'), "sports": [
        "soccer", "hockey"
    ], "template": "groupped_yes_no_list", "groups": [
        {
            "name": "{H}", "mnemonics": [
            {"title": t('markets.main.places.2'), "name": "coeff_HOME_PLACE_IN_TOURNAMENT_2_"},
            {"title": t('markets.main.places.3'), "name": "coeff_HOME_PLACE_IN_TOURNAMENT_3_"},
            {"title": t('markets.main.places.1-3'), "name": "coeff_HOME_PLACE_IN_TOURNAMENT_FROM_1_TO_3_"}
        ]
        },
        {
            "name": "{A}", "mnemonics": [
            {"title": t('markets.main.places.2'), "name": "coeff_AWAY_PLACE_IN_TOURNAMENT_2_"},
            {"title": t('markets.main.places.3'), "name": "coeff_AWAY_PLACE_IN_TOURNAMENT_3_"},
            {"title": t('markets.main.places.1-3'), "name": "coeff_AWAY_PLACE_IN_TOURNAMENT_FROM_1_TO_3_"}
        ]
        }
    ], "id": 17, "group_id": 1, "dependencies": [
        "coeff_HOME_PLACE_IN_TOURNAMENT_2_YES",
        "coeff_HOME_PLACE_IN_TOURNAMENT_2_NO", "coeff_HOME_PLACE_IN_TOURNAMENT_3_YES",
        "coeff_HOME_PLACE_IN_TOURNAMENT_3_NO", "coeff_HOME_PLACE_IN_TOURNAMENT_FROM_1_TO_3_YES",
        "coeff_HOME_PLACE_IN_TOURNAMENT_FROM_1_TO_3_NO", "coeff_AWAY_PLACE_IN_TOURNAMENT_2_YES",
        "coeff_AWAY_PLACE_IN_TOURNAMENT_2_NO", "coeff_AWAY_PLACE_IN_TOURNAMENT_3_YES",
        "coeff_AWAY_PLACE_IN_TOURNAMENT_3_NO", "coeff_AWAY_PLACE_IN_TOURNAMENT_FROM_1_TO_3_YES",
        "coeff_AWAY_PLACE_IN_TOURNAMENT_FROM_1_TO_3_NO"
    ]
    },
    {
        "name": t('markets.main.reach_home'), "sports": [
        "soccer", "hockey"
    ], "template": "yes_no_list", "rows": [
        {"title": "{H}", "name": "coeff_HOME_REACH_GROUP_"}
    ], "id": 18, "group_id": 1, "dependencies": ["coeff_HOME_REACH_GROUP_YES", "coeff_HOME_REACH_GROUP_NO"]
    },
    {
        "name": t('markets.main.reach_quarterfinal'), "sports": [
        "soccer", "hockey"
    ], "template": "yes_no_list", "rows": [
        {"title": "{H}", "name": "coeff_HOME_REACH_QUARTERFINAL_"},
        {"title": "{A}", "name": "coeff_AWAY_REACH_QUARTERFINAL_"}
    ], "id": 19, "group_id": 1, "dependencies": [
        "coeff_HOME_REACH_QUARTERFINAL_YES",
        "coeff_HOME_REACH_QUARTERFINAL_NO", "coeff_AWAY_REACH_QUARTERFINAL_YES", "coeff_AWAY_REACH_QUARTERFINAL_NO"
    ]
    },
    {
        "name": t('markets.main.reach_semifinal'), "sports": [
        "soccer", "hockey"
    ], "template": "yes_no_list", "rows": [
        {"title": "{H}", "name": "coeff_HOME_REACH_SEMIFINAL_"},
        {"title": "{A}", "name": "coeff_AWAY_REACH_SEMIFINAL_"}
    ], "id": 20, "group_id": 1, "dependencies": [
        "coeff_HOME_REACH_SEMIFINAL_YES", "coeff_HOME_REACH_SEMIFINAL_NO",
        "coeff_AWAY_REACH_SEMIFINAL_YES", "coeff_AWAY_REACH_SEMIFINAL_NO"
    ]
    },
    {
        "name": t('markets.main.reach_final'), "sports": [
        "soccer", "hockey"
    ], "template": "yes_no_list", "rows": [
        {"title": "{H}", "name": "coeff_HOME_REACH_FINAL_"},
        {"title": "{A}", "name": "coeff_AWAY_REACH_FINAL_"}
    ], "id": 21, "group_id": 1, "dependencies": [
        "coeff_HOME_REACH_FINAL_YES", "coeff_HOME_REACH_FINAL_NO",
        "coeff_AWAY_REACH_FINAL_YES", "coeff_AWAY_REACH_FINAL_NO"
    ]
    },
    {
        "name": {"default": t('markets.fora.victory'), "volleyball": t('markets.fora.points')},
        "template": "fora",
        "id": 22,
        "group_id": 4,
        "dependencies": [
            "coeff_ODDS_FT_0ODDS", "coeff_ODDS_FT_0ODDS_A", "coeff_ODDS_FT_0ODDS_H", "coeff_ODDS_FT_1ODDS",
            "coeff_ODDS_FT_1ODDS_A", "coeff_ODDS_FT_1ODDS_H", "coeff_ODDS_FT_2ODDS", "coeff_ODDS_FT_2ODDS_A",
            "coeff_ODDS_FT_2ODDS_H", "coeff_ODDS_FT_3ODDS", "coeff_ODDS_FT_3ODDS_A", "coeff_ODDS_FT_3ODDS_H",
            "coeff_ODDS_FT_4ODDS", "coeff_ODDS_FT_4ODDS_A", "coeff_ODDS_FT_4ODDS_H", "coeff_ODDS_FT_5ODDS",
            "coeff_ODDS_FT_5ODDS_A", "coeff_ODDS_FT_5ODDS_H", "coeff_ODDS_FT_6ODDS", "coeff_ODDS_FT_6ODDS_A",
            "coeff_ODDS_FT_6ODDS_H", "coeff_ODDS_FT_7ODDS", "coeff_ODDS_FT_7ODDS_A", "coeff_ODDS_FT_7ODDS_H",
            "coeff_ODDS_FT_8ODDS", "coeff_ODDS_FT_8ODDS_A", "coeff_ODDS_FT_8ODDS_H", "coeff_ODDS_FT_9ODDS",
            "coeff_ODDS_FT_9ODDS_A", "coeff_ODDS_FT_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_FT_0ODDS", "coeff_ODDS_FT_1ODDS", "coeff_ODDS_FT_2ODDS", "coeff_ODDS_FT_3ODDS",
            "coeff_ODDS_FT_4ODDS", "coeff_ODDS_FT_5ODDS", "coeff_ODDS_FT_6ODDS", "coeff_ODDS_FT_7ODDS",
            "coeff_ODDS_FT_8ODDS", "coeff_ODDS_FT_9ODDS"
        ]
    },
    {
        "name": t('markets.fora.time', {part: 1}), "sports": [
        "soccer"
    ], "template": "fora", "id": 23, "group_id": 4, "dependencies": [
        "coeff_ODDS_HT1_0ODDS", "coeff_ODDS_HT1_0ODDS_A", "coeff_ODDS_HT1_0ODDS_H", "coeff_ODDS_HT1_1ODDS",
        "coeff_ODDS_HT1_1ODDS_A", "coeff_ODDS_HT1_1ODDS_H", "coeff_ODDS_HT1_2ODDS", "coeff_ODDS_HT1_2ODDS_A",
        "coeff_ODDS_HT1_2ODDS_H", "coeff_ODDS_HT1_3ODDS", "coeff_ODDS_HT1_3ODDS_A", "coeff_ODDS_HT1_3ODDS_H",
        "coeff_ODDS_HT1_4ODDS", "coeff_ODDS_HT1_4ODDS_A", "coeff_ODDS_HT1_4ODDS_H", "coeff_ODDS_HT1_5ODDS",
        "coeff_ODDS_HT1_5ODDS_A", "coeff_ODDS_HT1_5ODDS_H", "coeff_ODDS_HT1_6ODDS", "coeff_ODDS_HT1_6ODDS_A",
        "coeff_ODDS_HT1_6ODDS_H", "coeff_ODDS_HT1_7ODDS", "coeff_ODDS_HT1_7ODDS_A", "coeff_ODDS_HT1_7ODDS_H",
        "coeff_ODDS_HT1_8ODDS", "coeff_ODDS_HT1_8ODDS_A", "coeff_ODDS_HT1_8ODDS_H", "coeff_ODDS_HT1_9ODDS",
        "coeff_ODDS_HT1_9ODDS_A", "coeff_ODDS_HT1_9ODDS_H"
    ], "bases": [
        "coeff_ODDS_HT1_0ODDS", "coeff_ODDS_HT1_1ODDS", "coeff_ODDS_HT1_2ODDS", "coeff_ODDS_HT1_3ODDS",
        "coeff_ODDS_HT1_4ODDS", "coeff_ODDS_HT1_5ODDS", "coeff_ODDS_HT1_6ODDS", "coeff_ODDS_HT1_7ODDS",
        "coeff_ODDS_HT1_8ODDS", "coeff_ODDS_HT1_9ODDS"
    ]
    },
    {
        "name": t('markets.fora.time', {part: 2}), "sports": [
        "soccer"
    ], "template": "fora", "id": 24, "group_id": 4, "dependencies": [
        "coeff_ODDS_HT2_0ODDS", "coeff_ODDS_HT2_0ODDS_A", "coeff_ODDS_HT2_0ODDS_H", "coeff_ODDS_HT2_1ODDS",
        "coeff_ODDS_HT2_1ODDS_A", "coeff_ODDS_HT2_1ODDS_H", "coeff_ODDS_HT2_2ODDS", "coeff_ODDS_HT2_2ODDS_A",
        "coeff_ODDS_HT2_2ODDS_H", "coeff_ODDS_HT2_3ODDS", "coeff_ODDS_HT2_3ODDS_A", "coeff_ODDS_HT2_3ODDS_H",
        "coeff_ODDS_HT2_4ODDS", "coeff_ODDS_HT2_4ODDS_A", "coeff_ODDS_HT2_4ODDS_H", "coeff_ODDS_HT2_5ODDS",
        "coeff_ODDS_HT2_5ODDS_A", "coeff_ODDS_HT2_5ODDS_H", "coeff_ODDS_HT2_6ODDS", "coeff_ODDS_HT2_6ODDS_A",
        "coeff_ODDS_HT2_6ODDS_H", "coeff_ODDS_HT2_7ODDS", "coeff_ODDS_HT2_7ODDS_A", "coeff_ODDS_HT2_7ODDS_H",
        "coeff_ODDS_HT2_8ODDS", "coeff_ODDS_HT2_8ODDS_A", "coeff_ODDS_HT2_8ODDS_H", "coeff_ODDS_HT2_9ODDS",
        "coeff_ODDS_HT2_9ODDS_A", "coeff_ODDS_HT2_9ODDS_H"
    ], "bases": [
        "coeff_ODDS_HT2_0ODDS", "coeff_ODDS_HT2_1ODDS", "coeff_ODDS_HT2_2ODDS", "coeff_ODDS_HT2_3ODDS",
        "coeff_ODDS_HT2_4ODDS", "coeff_ODDS_HT2_5ODDS", "coeff_ODDS_HT2_6ODDS", "coeff_ODDS_HT2_7ODDS",
        "coeff_ODDS_HT2_8ODDS", "coeff_ODDS_HT2_9ODDS"
    ]
    },
    {
        "name": t('markets.fora.period', {part: 1}),
        "template": "fora",
        "sports": ["hockey"],
        "id": 25,
        "group_id": 4,
        "dependencies": [
            "coeff_ODDS_HTT1_0ODDS", "coeff_ODDS_HTT1_0ODDS_A",
            "coeff_ODDS_HTT1_0ODDS_H", "coeff_ODDS_HTT1_1ODDS", "coeff_ODDS_HTT1_1ODDS_A", "coeff_ODDS_HTT1_1ODDS_H",
            "coeff_ODDS_HTT1_2ODDS", "coeff_ODDS_HTT1_2ODDS_A", "coeff_ODDS_HTT1_2ODDS_H", "coeff_ODDS_HTT1_3ODDS",
            "coeff_ODDS_HTT1_3ODDS_A", "coeff_ODDS_HTT1_3ODDS_H", "coeff_ODDS_HTT1_4ODDS", "coeff_ODDS_HTT1_4ODDS_A",
            "coeff_ODDS_HTT1_4ODDS_H", "coeff_ODDS_HTT1_5ODDS", "coeff_ODDS_HTT1_5ODDS_A", "coeff_ODDS_HTT1_5ODDS_H",
            "coeff_ODDS_HTT1_6ODDS", "coeff_ODDS_HTT1_6ODDS_A", "coeff_ODDS_HTT1_6ODDS_H", "coeff_ODDS_HTT1_7ODDS",
            "coeff_ODDS_HTT1_7ODDS_A", "coeff_ODDS_HTT1_7ODDS_H", "coeff_ODDS_HTT1_8ODDS", "coeff_ODDS_HTT1_8ODDS_A",
            "coeff_ODDS_HTT1_8ODDS_H", "coeff_ODDS_HTT1_9ODDS", "coeff_ODDS_HTT1_9ODDS_A", "coeff_ODDS_HTT1_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HTT1_0ODDS", "coeff_ODDS_HTT1_1ODDS", "coeff_ODDS_HTT1_2ODDS", "coeff_ODDS_HTT1_3ODDS",
            "coeff_ODDS_HTT1_4ODDS", "coeff_ODDS_HTT1_5ODDS", "coeff_ODDS_HTT1_6ODDS", "coeff_ODDS_HTT1_7ODDS",
            "coeff_ODDS_HTT1_8ODDS", "coeff_ODDS_HTT1_9ODDS"
        ]
    },
    {
        "name": t('markets.fora.period', {part: 2}),
        "template": "fora",
        "sports": ["hockey"],
        "id": 26,
        "group_id": 4,
        "dependencies": [
            "coeff_ODDS_HTT2_0ODDS", "coeff_ODDS_HTT2_0ODDS_A",
            "coeff_ODDS_HTT2_0ODDS_H", "coeff_ODDS_HTT2_1ODDS", "coeff_ODDS_HTT2_1ODDS_A", "coeff_ODDS_HTT2_1ODDS_H",
            "coeff_ODDS_HTT2_2ODDS", "coeff_ODDS_HTT2_2ODDS_A", "coeff_ODDS_HTT2_2ODDS_H", "coeff_ODDS_HTT2_3ODDS",
            "coeff_ODDS_HTT2_3ODDS_A", "coeff_ODDS_HTT2_3ODDS_H", "coeff_ODDS_HTT2_4ODDS", "coeff_ODDS_HTT2_4ODDS_A",
            "coeff_ODDS_HTT2_4ODDS_H", "coeff_ODDS_HTT2_5ODDS", "coeff_ODDS_HTT2_5ODDS_A", "coeff_ODDS_HTT2_5ODDS_H",
            "coeff_ODDS_HTT2_6ODDS", "coeff_ODDS_HTT2_6ODDS_A", "coeff_ODDS_HTT2_6ODDS_H", "coeff_ODDS_HTT2_7ODDS",
            "coeff_ODDS_HTT2_7ODDS_A", "coeff_ODDS_HTT2_7ODDS_H", "coeff_ODDS_HTT2_8ODDS", "coeff_ODDS_HTT2_8ODDS_A",
            "coeff_ODDS_HTT2_8ODDS_H", "coeff_ODDS_HTT2_9ODDS", "coeff_ODDS_HTT2_9ODDS_A", "coeff_ODDS_HTT2_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HTT2_0ODDS", "coeff_ODDS_HTT2_1ODDS", "coeff_ODDS_HTT2_2ODDS", "coeff_ODDS_HTT2_3ODDS",
            "coeff_ODDS_HTT2_4ODDS", "coeff_ODDS_HTT2_5ODDS", "coeff_ODDS_HTT2_6ODDS", "coeff_ODDS_HTT2_7ODDS",
            "coeff_ODDS_HTT2_8ODDS", "coeff_ODDS_HTT2_9ODDS"
        ]
    },
    {
        "name": t('markets.fora.period', {part: 3}),
        "template": "fora",
        "sports": ["hockey"],
        "id": 27,
        "group_id": 4,
        "dependencies": [
            "coeff_ODDS_HTT3_0ODDS", "coeff_ODDS_HTT3_0ODDS_A",
            "coeff_ODDS_HTT3_0ODDS_H", "coeff_ODDS_HTT3_1ODDS", "coeff_ODDS_HTT3_1ODDS_A", "coeff_ODDS_HTT3_1ODDS_H",
            "coeff_ODDS_HTT3_2ODDS", "coeff_ODDS_HTT3_2ODDS_A", "coeff_ODDS_HTT3_2ODDS_H", "coeff_ODDS_HTT3_3ODDS",
            "coeff_ODDS_HTT3_3ODDS_A", "coeff_ODDS_HTT3_3ODDS_H", "coeff_ODDS_HTT3_4ODDS", "coeff_ODDS_HTT3_4ODDS_A",
            "coeff_ODDS_HTT3_4ODDS_H", "coeff_ODDS_HTT3_5ODDS", "coeff_ODDS_HTT3_5ODDS_A", "coeff_ODDS_HTT3_5ODDS_H",
            "coeff_ODDS_HTT3_6ODDS", "coeff_ODDS_HTT3_6ODDS_A", "coeff_ODDS_HTT3_6ODDS_H", "coeff_ODDS_HTT3_7ODDS",
            "coeff_ODDS_HTT3_7ODDS_A", "coeff_ODDS_HTT3_7ODDS_H", "coeff_ODDS_HTT3_8ODDS", "coeff_ODDS_HTT3_8ODDS_A",
            "coeff_ODDS_HTT3_8ODDS_H", "coeff_ODDS_HTT3_9ODDS", "coeff_ODDS_HTT3_9ODDS_A", "coeff_ODDS_HTT3_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HTT3_0ODDS", "coeff_ODDS_HTT3_1ODDS", "coeff_ODDS_HTT3_2ODDS", "coeff_ODDS_HTT3_3ODDS",
            "coeff_ODDS_HTT3_4ODDS", "coeff_ODDS_HTT3_5ODDS", "coeff_ODDS_HTT3_6ODDS", "coeff_ODDS_HTT3_7ODDS",
            "coeff_ODDS_HTT3_8ODDS", "coeff_ODDS_HTT3_9ODDS"
        ]
    },
    {
        "name": t('markets.fora.quarter', {part: 1}),
        "template": "fora",
        "sports": ["basketball"],
        "id": 28,
        "group_id": 4,
        "dependencies": [
            "coeff_ODDS_HTQ1_0ODDS", "coeff_ODDS_HTQ1_0ODDS_A",
            "coeff_ODDS_HTQ1_0ODDS_H", "coeff_ODDS_HTQ1_1ODDS", "coeff_ODDS_HTQ1_1ODDS_A", "coeff_ODDS_HTQ1_1ODDS_H",
            "coeff_ODDS_HTQ1_2ODDS", "coeff_ODDS_HTQ1_2ODDS_A", "coeff_ODDS_HTQ1_2ODDS_H", "coeff_ODDS_HTQ1_3ODDS",
            "coeff_ODDS_HTQ1_3ODDS_A", "coeff_ODDS_HTQ1_3ODDS_H", "coeff_ODDS_HTQ1_4ODDS", "coeff_ODDS_HTQ1_4ODDS_A",
            "coeff_ODDS_HTQ1_4ODDS_H", "coeff_ODDS_HTQ1_5ODDS", "coeff_ODDS_HTQ1_5ODDS_A", "coeff_ODDS_HTQ1_5ODDS_H",
            "coeff_ODDS_HTQ1_6ODDS", "coeff_ODDS_HTQ1_6ODDS_A", "coeff_ODDS_HTQ1_6ODDS_H", "coeff_ODDS_HTQ1_7ODDS",
            "coeff_ODDS_HTQ1_7ODDS_A", "coeff_ODDS_HTQ1_7ODDS_H", "coeff_ODDS_HTQ1_8ODDS", "coeff_ODDS_HTQ1_8ODDS_A",
            "coeff_ODDS_HTQ1_8ODDS_H", "coeff_ODDS_HTQ1_9ODDS", "coeff_ODDS_HTQ1_9ODDS_A", "coeff_ODDS_HTQ1_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HTQ1_0ODDS", "coeff_ODDS_HTQ1_1ODDS", "coeff_ODDS_HTQ1_2ODDS", "coeff_ODDS_HTQ1_3ODDS",
            "coeff_ODDS_HTQ1_4ODDS", "coeff_ODDS_HTQ1_5ODDS", "coeff_ODDS_HTQ1_6ODDS", "coeff_ODDS_HTQ1_7ODDS",
            "coeff_ODDS_HTQ1_8ODDS", "coeff_ODDS_HTQ1_9ODDS"
        ]
    },
    {
        "name": t('markets.fora.quarter', {part: 2}),
        "template": "fora",
        "sports": ["basketball"],
        "id": 29,
        "group_id": 4,
        "dependencies": [
            "coeff_ODDS_HTQ2_0ODDS", "coeff_ODDS_HTQ2_0ODDS_A",
            "coeff_ODDS_HTQ2_0ODDS_H", "coeff_ODDS_HTQ2_1ODDS", "coeff_ODDS_HTQ2_1ODDS_A", "coeff_ODDS_HTQ2_1ODDS_H",
            "coeff_ODDS_HTQ2_2ODDS", "coeff_ODDS_HTQ2_2ODDS_A", "coeff_ODDS_HTQ2_2ODDS_H", "coeff_ODDS_HTQ2_3ODDS",
            "coeff_ODDS_HTQ2_3ODDS_A", "coeff_ODDS_HTQ2_3ODDS_H", "coeff_ODDS_HTQ2_4ODDS", "coeff_ODDS_HTQ2_4ODDS_A",
            "coeff_ODDS_HTQ2_4ODDS_H", "coeff_ODDS_HTQ2_5ODDS", "coeff_ODDS_HTQ2_5ODDS_A", "coeff_ODDS_HTQ2_5ODDS_H",
            "coeff_ODDS_HTQ2_6ODDS", "coeff_ODDS_HTQ2_6ODDS_A", "coeff_ODDS_HTQ2_6ODDS_H", "coeff_ODDS_HTQ2_7ODDS",
            "coeff_ODDS_HTQ2_7ODDS_A", "coeff_ODDS_HTQ2_7ODDS_H", "coeff_ODDS_HTQ2_8ODDS", "coeff_ODDS_HTQ2_8ODDS_A",
            "coeff_ODDS_HTQ2_8ODDS_H", "coeff_ODDS_HTQ2_9ODDS", "coeff_ODDS_HTQ2_9ODDS_A", "coeff_ODDS_HTQ2_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HTQ2_0ODDS", "coeff_ODDS_HTQ2_1ODDS", "coeff_ODDS_HTQ2_2ODDS", "coeff_ODDS_HTQ2_3ODDS",
            "coeff_ODDS_HTQ2_4ODDS", "coeff_ODDS_HTQ2_5ODDS", "coeff_ODDS_HTQ2_6ODDS", "coeff_ODDS_HTQ2_7ODDS",
            "coeff_ODDS_HTQ2_8ODDS", "coeff_ODDS_HTQ2_9ODDS"
        ]
    },
    {
        "name": t('markets.fora.quarter', {part: 3}),
        "template": "fora",
        "sports": ["basketball"],
        "id": 30,
        "group_id": 4,
        "dependencies": [
            "coeff_ODDS_HTQ3_0ODDS", "coeff_ODDS_HTQ3_0ODDS_A",
            "coeff_ODDS_HTQ3_0ODDS_H", "coeff_ODDS_HTQ3_1ODDS", "coeff_ODDS_HTQ3_1ODDS_A", "coeff_ODDS_HTQ3_1ODDS_H",
            "coeff_ODDS_HTQ3_2ODDS", "coeff_ODDS_HTQ3_2ODDS_A", "coeff_ODDS_HTQ3_2ODDS_H", "coeff_ODDS_HTQ3_3ODDS",
            "coeff_ODDS_HTQ3_3ODDS_A", "coeff_ODDS_HTQ3_3ODDS_H", "coeff_ODDS_HTQ3_4ODDS", "coeff_ODDS_HTQ3_4ODDS_A",
            "coeff_ODDS_HTQ3_4ODDS_H", "coeff_ODDS_HTQ3_5ODDS", "coeff_ODDS_HTQ3_5ODDS_A", "coeff_ODDS_HTQ3_5ODDS_H",
            "coeff_ODDS_HTQ3_6ODDS", "coeff_ODDS_HTQ3_6ODDS_A", "coeff_ODDS_HTQ3_6ODDS_H", "coeff_ODDS_HTQ3_7ODDS",
            "coeff_ODDS_HTQ3_7ODDS_A", "coeff_ODDS_HTQ3_7ODDS_H", "coeff_ODDS_HTQ3_8ODDS", "coeff_ODDS_HTQ3_8ODDS_A",
            "coeff_ODDS_HTQ3_8ODDS_H", "coeff_ODDS_HTQ3_9ODDS", "coeff_ODDS_HTQ3_9ODDS_A", "coeff_ODDS_HTQ3_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HTQ3_0ODDS", "coeff_ODDS_HTQ3_1ODDS", "coeff_ODDS_HTQ3_2ODDS", "coeff_ODDS_HTQ3_3ODDS",
            "coeff_ODDS_HTQ3_4ODDS", "coeff_ODDS_HTQ3_5ODDS", "coeff_ODDS_HTQ3_6ODDS", "coeff_ODDS_HTQ3_7ODDS",
            "coeff_ODDS_HTQ3_8ODDS", "coeff_ODDS_HTQ3_9ODDS"
        ]
    },
    {
        "name": t('markets.fora.quarter', {part: 4}),
        "template": "fora",
        "sports": ["basketball"],
        "id": 31,
        "group_id": 4,
        "dependencies": [
            "coeff_ODDS_HTQ4_0ODDS", "coeff_ODDS_HTQ4_0ODDS_A",
            "coeff_ODDS_HTQ4_0ODDS_H", "coeff_ODDS_HTQ4_1ODDS", "coeff_ODDS_HTQ4_1ODDS_A", "coeff_ODDS_HTQ4_1ODDS_H",
            "coeff_ODDS_HTQ4_2ODDS", "coeff_ODDS_HTQ4_2ODDS_A", "coeff_ODDS_HTQ4_2ODDS_H", "coeff_ODDS_HTQ4_3ODDS",
            "coeff_ODDS_HTQ4_3ODDS_A", "coeff_ODDS_HTQ4_3ODDS_H", "coeff_ODDS_HTQ4_4ODDS", "coeff_ODDS_HTQ4_4ODDS_A",
            "coeff_ODDS_HTQ4_4ODDS_H", "coeff_ODDS_HTQ4_5ODDS", "coeff_ODDS_HTQ4_5ODDS_A", "coeff_ODDS_HTQ4_5ODDS_H",
            "coeff_ODDS_HTQ4_6ODDS", "coeff_ODDS_HTQ4_6ODDS_A", "coeff_ODDS_HTQ4_6ODDS_H", "coeff_ODDS_HTQ4_7ODDS",
            "coeff_ODDS_HTQ4_7ODDS_A", "coeff_ODDS_HTQ4_7ODDS_H", "coeff_ODDS_HTQ4_8ODDS", "coeff_ODDS_HTQ4_8ODDS_A",
            "coeff_ODDS_HTQ4_8ODDS_H", "coeff_ODDS_HTQ4_9ODDS", "coeff_ODDS_HTQ4_9ODDS_A", "coeff_ODDS_HTQ4_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HTQ4_0ODDS", "coeff_ODDS_HTQ4_1ODDS", "coeff_ODDS_HTQ4_2ODDS", "coeff_ODDS_HTQ4_3ODDS",
            "coeff_ODDS_HTQ4_4ODDS", "coeff_ODDS_HTQ4_5ODDS", "coeff_ODDS_HTQ4_6ODDS", "coeff_ODDS_HTQ4_7ODDS",
            "coeff_ODDS_HTQ4_8ODDS", "coeff_ODDS_HTQ4_9ODDS"
        ]
    },
    {
        "name": t('markets.fora.half', {part: 1}),
        "template": "fora",
        "sports": ["basketball"],
        "id": 32,
        "group_id": 4,
        "dependencies": [
            "coeff_ODDS_HT1_0ODDS", "coeff_ODDS_HT1_0ODDS_A",
            "coeff_ODDS_HT1_0ODDS_H", "coeff_ODDS_HT1_1ODDS", "coeff_ODDS_HT1_1ODDS_A", "coeff_ODDS_HT1_1ODDS_H",
            "coeff_ODDS_HT1_2ODDS", "coeff_ODDS_HT1_2ODDS_A", "coeff_ODDS_HT1_2ODDS_H", "coeff_ODDS_HT1_3ODDS",
            "coeff_ODDS_HT1_3ODDS_A", "coeff_ODDS_HT1_3ODDS_H", "coeff_ODDS_HT1_4ODDS", "coeff_ODDS_HT1_4ODDS_A",
            "coeff_ODDS_HT1_4ODDS_H", "coeff_ODDS_HT1_5ODDS", "coeff_ODDS_HT1_5ODDS_A", "coeff_ODDS_HT1_5ODDS_H",
            "coeff_ODDS_HT1_6ODDS", "coeff_ODDS_HT1_6ODDS_A", "coeff_ODDS_HT1_6ODDS_H", "coeff_ODDS_HT1_7ODDS",
            "coeff_ODDS_HT1_7ODDS_A", "coeff_ODDS_HT1_7ODDS_H", "coeff_ODDS_HT1_8ODDS", "coeff_ODDS_HT1_8ODDS_A",
            "coeff_ODDS_HT1_8ODDS_H", "coeff_ODDS_HT1_9ODDS", "coeff_ODDS_HT1_9ODDS_A", "coeff_ODDS_HT1_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HT1_0ODDS", "coeff_ODDS_HT1_1ODDS", "coeff_ODDS_HT1_2ODDS", "coeff_ODDS_HT1_3ODDS",
            "coeff_ODDS_HT1_4ODDS", "coeff_ODDS_HT1_5ODDS", "coeff_ODDS_HT1_6ODDS", "coeff_ODDS_HT1_7ODDS",
            "coeff_ODDS_HT1_8ODDS", "coeff_ODDS_HT1_9ODDS"
        ]
    },
    {
        "name": t('markets.fora.half', {part: 2}),
        "template": "fora",
        "sports": ["basketball"],
        "id": 33,
        "group_id": 4,
        "dependencies": [
            "coeff_ODDS_HT2_0ODDS", "coeff_ODDS_HT2_0ODDS_A",
            "coeff_ODDS_HT2_0ODDS_H", "coeff_ODDS_HT2_1ODDS", "coeff_ODDS_HT2_1ODDS_A", "coeff_ODDS_HT2_1ODDS_H",
            "coeff_ODDS_HT2_2ODDS", "coeff_ODDS_HT2_2ODDS_A", "coeff_ODDS_HT2_2ODDS_H", "coeff_ODDS_HT2_3ODDS",
            "coeff_ODDS_HT2_3ODDS_A", "coeff_ODDS_HT2_3ODDS_H", "coeff_ODDS_HT2_4ODDS", "coeff_ODDS_HT2_4ODDS_A",
            "coeff_ODDS_HT2_4ODDS_H", "coeff_ODDS_HT2_5ODDS", "coeff_ODDS_HT2_5ODDS_A", "coeff_ODDS_HT2_5ODDS_H",
            "coeff_ODDS_HT2_6ODDS", "coeff_ODDS_HT2_6ODDS_A", "coeff_ODDS_HT2_6ODDS_H", "coeff_ODDS_HT2_7ODDS",
            "coeff_ODDS_HT2_7ODDS_A", "coeff_ODDS_HT2_7ODDS_H", "coeff_ODDS_HT2_8ODDS", "coeff_ODDS_HT2_8ODDS_A",
            "coeff_ODDS_HT2_8ODDS_H", "coeff_ODDS_HT2_9ODDS", "coeff_ODDS_HT2_9ODDS_A", "coeff_ODDS_HT2_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HT2_0ODDS", "coeff_ODDS_HT2_1ODDS", "coeff_ODDS_HT2_2ODDS", "coeff_ODDS_HT2_3ODDS",
            "coeff_ODDS_HT2_4ODDS", "coeff_ODDS_HT2_5ODDS", "coeff_ODDS_HT2_6ODDS", "coeff_ODDS_HT2_7ODDS",
            "coeff_ODDS_HT2_8ODDS", "coeff_ODDS_HT2_9ODDS"
        ]
    },
    {
        "name": t('markets.fora.part', {part: 1}),
        "template": "fora",
        "sports": ["volleyball"],
        "id": 34,
        "group_id": 4,
        "dependencies": [
            "coeff_ODDS_HTS1_0ODDS", "coeff_ODDS_HTS1_0ODDS_A",
            "coeff_ODDS_HTS1_0ODDS_H", "coeff_ODDS_HTS1_1ODDS", "coeff_ODDS_HTS1_1ODDS_A", "coeff_ODDS_HTS1_1ODDS_H",
            "coeff_ODDS_HTS1_2ODDS", "coeff_ODDS_HTS1_2ODDS_A", "coeff_ODDS_HTS1_2ODDS_H", "coeff_ODDS_HTS1_3ODDS",
            "coeff_ODDS_HTS1_3ODDS_A", "coeff_ODDS_HTS1_3ODDS_H", "coeff_ODDS_HTS1_4ODDS", "coeff_ODDS_HTS1_4ODDS_A",
            "coeff_ODDS_HTS1_4ODDS_H", "coeff_ODDS_HTS1_5ODDS", "coeff_ODDS_HTS1_5ODDS_A", "coeff_ODDS_HTS1_5ODDS_H",
            "coeff_ODDS_HTS1_6ODDS", "coeff_ODDS_HTS1_6ODDS_A", "coeff_ODDS_HTS1_6ODDS_H", "coeff_ODDS_HTS1_7ODDS",
            "coeff_ODDS_HTS1_7ODDS_A", "coeff_ODDS_HTS1_7ODDS_H", "coeff_ODDS_HTS1_8ODDS", "coeff_ODDS_HTS1_8ODDS_A",
            "coeff_ODDS_HTS1_8ODDS_H", "coeff_ODDS_HTS1_9ODDS", "coeff_ODDS_HTS1_9ODDS_A", "coeff_ODDS_HTS1_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HTS1_0ODDS", "coeff_ODDS_HTS1_1ODDS", "coeff_ODDS_HTS1_2ODDS", "coeff_ODDS_HTS1_3ODDS",
            "coeff_ODDS_HTS1_4ODDS", "coeff_ODDS_HTS1_5ODDS", "coeff_ODDS_HTS1_6ODDS", "coeff_ODDS_HTS1_7ODDS",
            "coeff_ODDS_HTS1_8ODDS", "coeff_ODDS_HTS1_9ODDS"
        ]
    },
    {
        "name": t('markets.fora.part', {part: 2}),
        "template": "fora",
        "sports": ["volleyball"],
        "id": 35,
        "group_id": 4,
        "dependencies": [
            "coeff_ODDS_HTS2_0ODDS", "coeff_ODDS_HTS2_0ODDS_A",
            "coeff_ODDS_HTS2_0ODDS_H", "coeff_ODDS_HTS2_1ODDS", "coeff_ODDS_HTS2_1ODDS_A", "coeff_ODDS_HTS2_1ODDS_H",
            "coeff_ODDS_HTS2_2ODDS", "coeff_ODDS_HTS2_2ODDS_A", "coeff_ODDS_HTS2_2ODDS_H", "coeff_ODDS_HTS2_3ODDS",
            "coeff_ODDS_HTS2_3ODDS_A", "coeff_ODDS_HTS2_3ODDS_H", "coeff_ODDS_HTS2_4ODDS", "coeff_ODDS_HTS2_4ODDS_A",
            "coeff_ODDS_HTS2_4ODDS_H", "coeff_ODDS_HTS2_5ODDS", "coeff_ODDS_HTS2_5ODDS_A", "coeff_ODDS_HTS2_5ODDS_H",
            "coeff_ODDS_HTS2_6ODDS", "coeff_ODDS_HTS2_6ODDS_A", "coeff_ODDS_HTS2_6ODDS_H", "coeff_ODDS_HTS2_7ODDS",
            "coeff_ODDS_HTS2_7ODDS_A", "coeff_ODDS_HTS2_7ODDS_H", "coeff_ODDS_HTS2_8ODDS", "coeff_ODDS_HTS2_8ODDS_A",
            "coeff_ODDS_HTS2_8ODDS_H", "coeff_ODDS_HTS2_9ODDS", "coeff_ODDS_HTS2_9ODDS_A", "coeff_ODDS_HTS2_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HTS2_0ODDS", "coeff_ODDS_HTS2_1ODDS", "coeff_ODDS_HTS2_2ODDS", "coeff_ODDS_HTS2_3ODDS",
            "coeff_ODDS_HTS2_4ODDS", "coeff_ODDS_HTS2_5ODDS", "coeff_ODDS_HTS2_6ODDS", "coeff_ODDS_HTS2_7ODDS",
            "coeff_ODDS_HTS2_8ODDS", "coeff_ODDS_HTS2_9ODDS"
        ]
    },
    {
        "name": t('markets.fora.part', {part: 3}),
        "template": "fora",
        "sports": ["volleyball"],
        "id": 36,
        "group_id": 4,
        "dependencies": [
            "coeff_ODDS_HTS3_0ODDS", "coeff_ODDS_HTS3_0ODDS_A",
            "coeff_ODDS_HTS3_0ODDS_H", "coeff_ODDS_HTS3_1ODDS", "coeff_ODDS_HTS3_1ODDS_A", "coeff_ODDS_HTS3_1ODDS_H",
            "coeff_ODDS_HTS3_2ODDS", "coeff_ODDS_HTS3_2ODDS_A", "coeff_ODDS_HTS3_2ODDS_H", "coeff_ODDS_HTS3_3ODDS",
            "coeff_ODDS_HTS3_3ODDS_A", "coeff_ODDS_HTS3_3ODDS_H", "coeff_ODDS_HTS3_4ODDS", "coeff_ODDS_HTS3_4ODDS_A",
            "coeff_ODDS_HTS3_4ODDS_H", "coeff_ODDS_HTS3_5ODDS", "coeff_ODDS_HTS3_5ODDS_A", "coeff_ODDS_HTS3_5ODDS_H",
            "coeff_ODDS_HTS3_6ODDS", "coeff_ODDS_HTS3_6ODDS_A", "coeff_ODDS_HTS3_6ODDS_H", "coeff_ODDS_HTS3_7ODDS",
            "coeff_ODDS_HTS3_7ODDS_A", "coeff_ODDS_HTS3_7ODDS_H", "coeff_ODDS_HTS3_8ODDS", "coeff_ODDS_HTS3_8ODDS_A",
            "coeff_ODDS_HTS3_8ODDS_H", "coeff_ODDS_HTS3_9ODDS", "coeff_ODDS_HTS3_9ODDS_A", "coeff_ODDS_HTS3_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HTS3_0ODDS", "coeff_ODDS_HTS3_1ODDS", "coeff_ODDS_HTS3_2ODDS", "coeff_ODDS_HTS3_3ODDS",
            "coeff_ODDS_HTS3_4ODDS", "coeff_ODDS_HTS3_5ODDS", "coeff_ODDS_HTS3_6ODDS", "coeff_ODDS_HTS3_7ODDS",
            "coeff_ODDS_HTS3_8ODDS", "coeff_ODDS_HTS3_9ODDS"
        ]
    },
    {
        "name": {
            "default": t('markets.totals.goals'),
            "snooker": t('markets.totals.frames'),
            "tennis": t('markets.totals.games'),
            "baseball": t('markets.totals.rans'),
            "football": t('markets.totals.points'),
            "basketball": t('markets.totals.points'),
            "volleyball": t('markets.totals.points'),
            "biathlon": t('markets.totals.medals'),
            "olympic_games": t('markets.totals.medals'),
            "box": t('markets.totals.rounds'),
            "statistics": t('markets.totals.total')
        }, "template": "total", "id": 37, "group_id": 3,
        "dependencies": [
            "coeff_FT_TOTAL_0_T", "coeff_FT_TOTAL_0_TL", "coeff_FT_TOTAL_0_TG", "coeff_FT_TOTAL_1_T",
            "coeff_FT_TOTAL_1_TL", "coeff_FT_TOTAL_1_TG", "coeff_FT_TOTAL_2_T", "coeff_FT_TOTAL_2_TL",
            "coeff_FT_TOTAL_2_TG", "coeff_FT_TOTAL_3_T", "coeff_FT_TOTAL_3_TL", "coeff_FT_TOTAL_3_TG",
            "coeff_FT_TOTAL_4_T", "coeff_FT_TOTAL_4_TL", "coeff_FT_TOTAL_4_TG", "coeff_FT_TOTAL_5_T",
            "coeff_FT_TOTAL_5_TL", "coeff_FT_TOTAL_5_TG", "coeff_FT_TOTAL_6_T", "coeff_FT_TOTAL_6_TL",
            "coeff_FT_TOTAL_6_TG", "coeff_FT_TOTAL_7_T", "coeff_FT_TOTAL_7_TL", "coeff_FT_TOTAL_7_TG",
            "coeff_FT_TOTAL_8_T", "coeff_FT_TOTAL_8_TL", "coeff_FT_TOTAL_8_TG", "coeff_FT_TOTAL_9_T",
            "coeff_FT_TOTAL_9_TL", "coeff_FT_TOTAL_9_TG", "coeff_FT_Odd", "coeff_FT_Even"
        ], "bases": [
        "coeff_FT_TOTAL_0_T", "coeff_FT_TOTAL_1_T", "coeff_FT_TOTAL_2_T", "coeff_FT_TOTAL_3_T",
        "coeff_FT_TOTAL_4_T", "coeff_FT_TOTAL_5_T", "coeff_FT_TOTAL_6_T", "coeff_FT_TOTAL_7_T", "coeff_FT_TOTAL_8_T",
        "coeff_FT_TOTAL_9_T"
    ], "odd": "coeff_FT_"
    },
    {
        "name": t('markets.totals.goals_times'), "sports": [
        "soccer"
    ], "template": "yes_no_list", "id": 38, "group_id": 3, "dependencies": [
        "coeff_BOTH_HT_LESS_1_5_YES", "coeff_BOTH_HT_LESS_1_5_NO", "coeff_BOTH_HT_MORE_1_5_YES",
        "coeff_BOTH_HT_MORE_1_5_NO"
    ], "rows": [
        {"name": "coeff_BOTH_HT_LESS_1_5_", "title": t('markets.time_le15')},
        {"name": "coeff_BOTH_HT_MORE_1_5_", "title": t('markets.time_ge15')}
    ]
    },
    {
        "name": t('markets.totals.sets'),
        "sports": [
            "tennis", "table_tennis", "badminton"
        ],
        "template": "total",
        "base": "coeff_TOTAL_SETS_T",
        "id": 39,
        "group_id": 3,
        "dependencies": ["coeff_TOTAL_SETS_T", "coeff_TOTAL_SETS_TL", "coeff_TOTAL_SETS_TG"],
        "bases": ["coeff_TOTAL_SETS_T"]
    },
    {
        "name": t('markets.totals.goals_period', {part: 1}), "sports": [
        "hockey"
    ], "template": "total", "id": 40, "group_id": 3, "dependencies": [
        "coeff_HTT1_TOTAL_0_T", "coeff_HTT1_TOTAL_0_TL", "coeff_HTT1_TOTAL_0_TG", "coeff_HTP1_T", "coeff_HTP1_TL",
        "coeff_HTP1_TG", "coeff_HTT1_TOTAL_1_T", "coeff_HTT1_TOTAL_1_TL", "coeff_HTT1_TOTAL_1_TG",
        "coeff_HTT1_TOTAL_2_T", "coeff_HTT1_TOTAL_2_TL", "coeff_HTT1_TOTAL_2_TG", "coeff_HTT1_TOTAL_3_T",
        "coeff_HTT1_TOTAL_3_TL", "coeff_HTT1_TOTAL_3_TG", "coeff_HTT1_TOTAL_4_T", "coeff_HTT1_TOTAL_4_TL",
        "coeff_HTT1_TOTAL_4_TG", "coeff_HTT1_TOTAL_5_T", "coeff_HTT1_TOTAL_5_TL", "coeff_HTT1_TOTAL_5_TG",
        "coeff_HTT1_TOTAL_6_T", "coeff_HTT1_TOTAL_6_TL", "coeff_HTT1_TOTAL_6_TG", "coeff_HTT1_TOTAL_7_T",
        "coeff_HTT1_TOTAL_7_TL", "coeff_HTT1_TOTAL_7_TG", "coeff_HTT1_TOTAL_8_T", "coeff_HTT1_TOTAL_8_TL",
        "coeff_HTT1_TOTAL_8_TG", "coeff_HTT1_TOTAL_9_T", "coeff_HTT1_TOTAL_9_TL", "coeff_HTT1_TOTAL_9_TG",
        "coeff_HTT1_Odd", "coeff_HTT1_Even"
    ], "bases": [
        "coeff_HTT1_TOTAL_0_T", "coeff_HTP1_T", "coeff_HTT1_TOTAL_1_T", "coeff_HTT1_TOTAL_2_T",
        "coeff_HTT1_TOTAL_3_T", "coeff_HTT1_TOTAL_4_T", "coeff_HTT1_TOTAL_5_T", "coeff_HTT1_TOTAL_6_T",
        "coeff_HTT1_TOTAL_7_T", "coeff_HTT1_TOTAL_8_T", "coeff_HTT1_TOTAL_9_T"
    ], "odd": "coeff_HTT1_"
    },
    {
        "name": t('markets.totals.goals_period', {part: 2}), "sports": [
        "hockey"
    ], "template": "total", "id": 41, "group_id": 3, "dependencies": [
        "coeff_HTT2_TOTAL_0_T", "coeff_HTT2_TOTAL_0_TL", "coeff_HTT2_TOTAL_0_TG", "coeff_HTT2_TOTAL_1_T",
        "coeff_HTT2_TOTAL_1_TL", "coeff_HTT2_TOTAL_1_TG", "coeff_HTP2_T", "coeff_HTP2_TL", "coeff_HTP2_TG",
        "coeff_HTT2_TOTAL_2_T", "coeff_HTT2_TOTAL_2_TL", "coeff_HTT2_TOTAL_2_TG", "coeff_HTT2_TOTAL_3_T",
        "coeff_HTT2_TOTAL_3_TL", "coeff_HTT2_TOTAL_3_TG", "coeff_HTT2_TOTAL_4_T", "coeff_HTT2_TOTAL_4_TL",
        "coeff_HTT2_TOTAL_4_TG", "coeff_HTT2_TOTAL_5_T", "coeff_HTT2_TOTAL_5_TL", "coeff_HTT2_TOTAL_5_TG",
        "coeff_HTT2_TOTAL_6_T", "coeff_HTT2_TOTAL_6_TL", "coeff_HTT2_TOTAL_6_TG", "coeff_HTT2_TOTAL_7_T",
        "coeff_HTT2_TOTAL_7_TL", "coeff_HTT2_TOTAL_7_TG", "coeff_HTT2_TOTAL_8_T", "coeff_HTT2_TOTAL_8_TL",
        "coeff_HTT2_TOTAL_8_TG", "coeff_HTT2_TOTAL_9_T", "coeff_HTT2_TOTAL_9_TL", "coeff_HTT2_TOTAL_9_TG",
        "coeff_HTT2_Odd", "coeff_HTT2_Even"
    ], "bases": [
        "coeff_HTT2_TOTAL_0_T", "coeff_HTT2_TOTAL_1_T", "coeff_HTP2_T", "coeff_HTT2_TOTAL_2_T",
        "coeff_HTT2_TOTAL_3_T", "coeff_HTT2_TOTAL_4_T", "coeff_HTT2_TOTAL_5_T", "coeff_HTT2_TOTAL_6_T",
        "coeff_HTT2_TOTAL_7_T", "coeff_HTT2_TOTAL_8_T", "coeff_HTT2_TOTAL_9_T"
    ], "odd": "coeff_HTT2_"
    },
    {
        "name": t('markets.totals.goals_period', {part: 3}), "sports": [
        "hockey"
    ], "template": "total", "id": 42, "group_id": 3, "dependencies": [
        "coeff_HTT3_TOTAL_0_T", "coeff_HTT3_TOTAL_0_TL", "coeff_HTT3_TOTAL_0_TG", "coeff_HTT3_TOTAL_1_T",
        "coeff_HTT3_TOTAL_1_TL", "coeff_HTT3_TOTAL_1_TG", "coeff_HTT3_TOTAL_2_T", "coeff_HTT3_TOTAL_2_TL",
        "coeff_HTT3_TOTAL_2_TG", "coeff_HTP3_T", "coeff_HTP3_TL", "coeff_HTP3_TG", "coeff_HTT3_TOTAL_3_T",
        "coeff_HTT3_TOTAL_3_TL", "coeff_HTT3_TOTAL_3_TG", "coeff_HTT3_TOTAL_4_T", "coeff_HTT3_TOTAL_4_TL",
        "coeff_HTT3_TOTAL_4_TG", "coeff_HTT3_TOTAL_5_T", "coeff_HTT3_TOTAL_5_TL", "coeff_HTT3_TOTAL_5_TG",
        "coeff_HTT3_TOTAL_6_T", "coeff_HTT3_TOTAL_6_TL", "coeff_HTT3_TOTAL_6_TG", "coeff_HTT3_TOTAL_7_T",
        "coeff_HTT3_TOTAL_7_TL", "coeff_HTT3_TOTAL_7_TG", "coeff_HTT3_TOTAL_8_T", "coeff_HTT3_TOTAL_8_TL",
        "coeff_HTT3_TOTAL_8_TG", "coeff_HTT3_TOTAL_9_T", "coeff_HTT3_TOTAL_9_TL", "coeff_HTT3_TOTAL_9_TG",
        "coeff_HTT3_Odd", "coeff_HTT3_Even"
    ], "bases": [
        "coeff_HTT3_TOTAL_0_T", "coeff_HTT3_TOTAL_1_T", "coeff_HTT3_TOTAL_2_T", "coeff_HTP3_T",
        "coeff_HTT3_TOTAL_3_T", "coeff_HTT3_TOTAL_4_T", "coeff_HTT3_TOTAL_5_T", "coeff_HTT3_TOTAL_6_T",
        "coeff_HTT3_TOTAL_7_T", "coeff_HTT3_TOTAL_8_T", "coeff_HTT3_TOTAL_9_T"
    ], "odd": "coeff_HTT3_"
    },
    {
        "name": t('markets.totals.goals_quarter', {part: 1}), "sports": [
        "basketball"
    ], "template": "total", "id": 43, "group_id": 3, "dependencies": [
        "coeff_HTQ1_TOTAL_0_T", "coeff_HTQ1_TOTAL_0_TL", "coeff_HTQ1_TOTAL_0_TG", "coeff_HTQ1_T", "coeff_HTQ1_TL",
        "coeff_HTQ1_TG", "coeff_HTQ1_TOTAL_1_T", "coeff_HTQ1_TOTAL_1_TL", "coeff_HTQ1_TOTAL_1_TG",
        "coeff_HTQ1_TOTAL_2_T", "coeff_HTQ1_TOTAL_2_TL", "coeff_HTQ1_TOTAL_2_TG", "coeff_HTQ1_TOTAL_3_T",
        "coeff_HTQ1_TOTAL_3_TL", "coeff_HTQ1_TOTAL_3_TG", "coeff_HTQ1_TOTAL_4_T", "coeff_HTQ1_TOTAL_4_TL",
        "coeff_HTQ1_TOTAL_4_TG", "coeff_HTQ1_TOTAL_5_T", "coeff_HTQ1_TOTAL_5_TL", "coeff_HTQ1_TOTAL_5_TG",
        "coeff_HTQ1_TOTAL_6_T", "coeff_HTQ1_TOTAL_6_TL", "coeff_HTQ1_TOTAL_6_TG", "coeff_HTQ1_TOTAL_7_T",
        "coeff_HTQ1_TOTAL_7_TL", "coeff_HTQ1_TOTAL_7_TG", "coeff_HTQ1_TOTAL_8_T", "coeff_HTQ1_TOTAL_8_TL",
        "coeff_HTQ1_TOTAL_8_TG", "coeff_HTQ1_TOTAL_9_T", "coeff_HTQ1_TOTAL_9_TL", "coeff_HTQ1_TOTAL_9_TG",
        "coeff_HTQ1_Odd", "coeff_HTQ1_Even"
    ], "bases": [
        "coeff_HTQ1_TOTAL_0_T", "coeff_HTQ1_T", "coeff_HTQ1_TOTAL_1_T", "coeff_HTQ1_TOTAL_2_T",
        "coeff_HTQ1_TOTAL_3_T", "coeff_HTQ1_TOTAL_4_T", "coeff_HTQ1_TOTAL_5_T", "coeff_HTQ1_TOTAL_6_T",
        "coeff_HTQ1_TOTAL_7_T", "coeff_HTQ1_TOTAL_8_T", "coeff_HTQ1_TOTAL_9_T"
    ], "odd": "coeff_HTQ1_"
    },
    {
        "name": t('markets.totals.goals_quarter', {part: 2}), "sports": [
        "basketball"
    ], "template": "total", "id": 44, "group_id": 3, "dependencies": [
        "coeff_HTQ2_TOTAL_0_T", "coeff_HTQ2_TOTAL_0_TL", "coeff_HTQ2_TOTAL_0_TG", "coeff_HTQ2_TOTAL_1_T",
        "coeff_HTQ2_TOTAL_1_TL", "coeff_HTQ2_TOTAL_1_TG", "coeff_HTQ2_T", "coeff_HTQ2_TL", "coeff_HTQ2_TG",
        "coeff_HTQ2_TOTAL_2_T", "coeff_HTQ2_TOTAL_2_TL", "coeff_HTQ2_TOTAL_2_TG", "coeff_HTQ2_TOTAL_3_T",
        "coeff_HTQ2_TOTAL_3_TL", "coeff_HTQ2_TOTAL_3_TG", "coeff_HTQ2_TOTAL_4_T", "coeff_HTQ2_TOTAL_4_TL",
        "coeff_HTQ2_TOTAL_4_TG", "coeff_HTQ2_TOTAL_5_T", "coeff_HTQ2_TOTAL_5_TL", "coeff_HTQ2_TOTAL_5_TG",
        "coeff_HTQ2_TOTAL_6_T", "coeff_HTQ2_TOTAL_6_TL", "coeff_HTQ2_TOTAL_6_TG", "coeff_HTQ2_TOTAL_7_T",
        "coeff_HTQ2_TOTAL_7_TL", "coeff_HTQ2_TOTAL_7_TG", "coeff_HTQ2_TOTAL_8_T", "coeff_HTQ2_TOTAL_8_TL",
        "coeff_HTQ2_TOTAL_8_TG", "coeff_HTQ2_TOTAL_9_T", "coeff_HTQ2_TOTAL_9_TL", "coeff_HTQ2_TOTAL_9_TG",
        "coeff_HTQ2_Odd", "coeff_HTQ2_Even"
    ], "bases": [
        "coeff_HTQ2_TOTAL_0_T", "coeff_HTQ2_TOTAL_1_T", "coeff_HTQ2_T", "coeff_HTQ2_TOTAL_2_T",
        "coeff_HTQ2_TOTAL_3_T", "coeff_HTQ2_TOTAL_4_T", "coeff_HTQ2_TOTAL_5_T", "coeff_HTQ2_TOTAL_6_T",
        "coeff_HTQ2_TOTAL_7_T", "coeff_HTQ2_TOTAL_8_T", "coeff_HTQ2_TOTAL_9_T"
    ], "odd": "coeff_HTQ2_"
    },
    {
        "name": t('markets.totals.goals_quarter', {part: 3}), "sports": [
        "basketball"
    ], "template": "total", "id": 45, "group_id": 3, "dependencies": [
        "coeff_HTQ3_TOTAL_0_T", "coeff_HTQ3_TOTAL_0_TL", "coeff_HTQ3_TOTAL_0_TG", "coeff_HTQ3_TOTAL_1_T",
        "coeff_HTQ3_TOTAL_1_TL", "coeff_HTQ3_TOTAL_1_TG", "coeff_HTQ3_TOTAL_2_T", "coeff_HTQ3_TOTAL_2_TL",
        "coeff_HTQ3_TOTAL_2_TG", "coeff_HTQ3_T", "coeff_HTQ3_TL", "coeff_HTQ3_TG", "coeff_HTQ3_TOTAL_3_T",
        "coeff_HTQ3_TOTAL_3_TL", "coeff_HTQ3_TOTAL_3_TG", "coeff_HTQ3_TOTAL_4_T", "coeff_HTQ3_TOTAL_4_TL",
        "coeff_HTQ3_TOTAL_4_TG", "coeff_HTQ3_TOTAL_5_T", "coeff_HTQ3_TOTAL_5_TL", "coeff_HTQ3_TOTAL_5_TG",
        "coeff_HTQ3_TOTAL_6_T", "coeff_HTQ3_TOTAL_6_TL", "coeff_HTQ3_TOTAL_6_TG", "coeff_HTQ3_TOTAL_7_T",
        "coeff_HTQ3_TOTAL_7_TL", "coeff_HTQ3_TOTAL_7_TG", "coeff_HTQ3_TOTAL_8_T", "coeff_HTQ3_TOTAL_8_TL",
        "coeff_HTQ3_TOTAL_8_TG", "coeff_HTQ3_TOTAL_9_T", "coeff_HTQ3_TOTAL_9_TL", "coeff_HTQ3_TOTAL_9_TG",
        "coeff_HTQ3_Odd", "coeff_HTQ3_Even"
    ], "bases": [
        "coeff_HTQ3_TOTAL_0_T", "coeff_HTQ3_TOTAL_1_T", "coeff_HTQ3_TOTAL_2_T", "coeff_HTQ3_T",
        "coeff_HTQ3_TOTAL_3_T", "coeff_HTQ3_TOTAL_4_T", "coeff_HTQ3_TOTAL_5_T", "coeff_HTQ3_TOTAL_6_T",
        "coeff_HTQ3_TOTAL_7_T", "coeff_HTQ3_TOTAL_8_T", "coeff_HTQ3_TOTAL_9_T"
    ], "odd": "coeff_HTQ3_"
    },
    {
        "name": t('markets.totals.goals_quarter', {part: 4}), "sports": [
        "basketball"
    ], "template": "total", "id": 46, "group_id": 3, "dependencies": [
        "coeff_HTQ4_TOTAL_0_T", "coeff_HTQ4_TOTAL_0_TL", "coeff_HTQ4_TOTAL_0_TG", "coeff_HTQ4_TOTAL_1_T",
        "coeff_HTQ4_TOTAL_1_TL", "coeff_HTQ4_TOTAL_1_TG", "coeff_HTQ4_TOTAL_2_T", "coeff_HTQ4_TOTAL_2_TL",
        "coeff_HTQ4_TOTAL_2_TG", "coeff_HTQ4_TOTAL_3_T", "coeff_HTQ4_TOTAL_3_TL", "coeff_HTQ4_TOTAL_3_TG",
        "coeff_HTQ4_T", "coeff_HTQ4_TL", "coeff_HTQ4_TG", "coeff_HTQ4_TOTAL_4_T", "coeff_HTQ4_TOTAL_4_TL",
        "coeff_HTQ4_TOTAL_4_TG", "coeff_HTQ4_TOTAL_5_T", "coeff_HTQ4_TOTAL_5_TL", "coeff_HTQ4_TOTAL_5_TG",
        "coeff_HTQ4_TOTAL_6_T", "coeff_HTQ4_TOTAL_6_TL", "coeff_HTQ4_TOTAL_6_TG", "coeff_HTQ4_TOTAL_7_T",
        "coeff_HTQ4_TOTAL_7_TL", "coeff_HTQ4_TOTAL_7_TG", "coeff_HTQ4_TOTAL_8_T", "coeff_HTQ4_TOTAL_8_TL",
        "coeff_HTQ4_TOTAL_8_TG", "coeff_HTQ4_TOTAL_9_T", "coeff_HTQ4_TOTAL_9_TL", "coeff_HTQ4_TOTAL_9_TG",
        "coeff_HTQ4_Odd", "coeff_HTQ4_Even"
    ], "bases": [
        "coeff_HTQ4_TOTAL_0_T", "coeff_HTQ4_TOTAL_1_T", "coeff_HTQ4_TOTAL_2_T", "coeff_HTQ4_TOTAL_3_T",
        "coeff_HTQ4_T", "coeff_HTQ4_TOTAL_4_T", "coeff_HTQ4_TOTAL_5_T", "coeff_HTQ4_TOTAL_6_T", "coeff_HTQ4_TOTAL_7_T",
        "coeff_HTQ4_TOTAL_8_T", "coeff_HTQ4_TOTAL_9_T"
    ], "odd": "coeff_HTQ4_"
    },
    {
        "name": t('markets.totals.goals_quarter', {part: 5}), "sports": [
        "basketball"
    ], "template": "total", "id": 47, "group_id": 3, "dependencies": [
        "coeff_HTQ5_TOTAL_0_T", "coeff_HTQ5_TOTAL_0_TL", "coeff_HTQ5_TOTAL_0_TG", "coeff_HTQ5_TOTAL_1_T",
        "coeff_HTQ5_TOTAL_1_TL", "coeff_HTQ5_TOTAL_1_TG", "coeff_HTQ5_TOTAL_2_T", "coeff_HTQ5_TOTAL_2_TL",
        "coeff_HTQ5_TOTAL_2_TG", "coeff_HTQ5_TOTAL_3_T", "coeff_HTQ5_TOTAL_3_TL", "coeff_HTQ5_TOTAL_3_TG",
        "coeff_HTQ5_TOTAL_4_T", "coeff_HTQ5_TOTAL_4_TL", "coeff_HTQ5_TOTAL_4_TG", "coeff_HTQ5_T", "coeff_HTQ5_TL",
        "coeff_HTQ5_TG", "coeff_HTQ5_TOTAL_5_T", "coeff_HTQ5_TOTAL_5_TL", "coeff_HTQ5_TOTAL_5_TG",
        "coeff_HTQ5_TOTAL_6_T", "coeff_HTQ5_TOTAL_6_TL", "coeff_HTQ5_TOTAL_6_TG", "coeff_HTQ5_TOTAL_7_T",
        "coeff_HTQ5_TOTAL_7_TL", "coeff_HTQ5_TOTAL_7_TG", "coeff_HTQ5_TOTAL_8_T", "coeff_HTQ5_TOTAL_8_TL",
        "coeff_HTQ5_TOTAL_8_TG", "coeff_HTQ5_TOTAL_9_T", "coeff_HTQ5_TOTAL_9_TL", "coeff_HTQ5_TOTAL_9_TG",
        "coeff_HTQ5_Odd", "coeff_HTQ5_Even"
    ], "bases": [
        "coeff_HTQ5_TOTAL_0_T", "coeff_HTQ5_TOTAL_1_T", "coeff_HTQ5_TOTAL_2_T", "coeff_HTQ5_TOTAL_3_T",
        "coeff_HTQ5_TOTAL_4_T", "coeff_HTQ5_T", "coeff_HTQ5_TOTAL_5_T", "coeff_HTQ5_TOTAL_6_T", "coeff_HTQ5_TOTAL_7_T",
        "coeff_HTQ5_TOTAL_8_T", "coeff_HTQ5_TOTAL_9_T"
    ], "odd": "coeff_HTQ5_"
    },
    {
        "name": t('markets.totals.goals_quarter', {part: 6}), "sports": [
        "basketball"
    ], "template": "total", "id": 48, "group_id": 3, "dependencies": [
        "coeff_HTQ6_TOTAL_0_T", "coeff_HTQ6_TOTAL_0_TL", "coeff_HTQ6_TOTAL_0_TG", "coeff_HTQ6_TOTAL_1_T",
        "coeff_HTQ6_TOTAL_1_TL", "coeff_HTQ6_TOTAL_1_TG", "coeff_HTQ6_TOTAL_2_T", "coeff_HTQ6_TOTAL_2_TL",
        "coeff_HTQ6_TOTAL_2_TG", "coeff_HTQ6_TOTAL_3_T", "coeff_HTQ6_TOTAL_3_TL", "coeff_HTQ6_TOTAL_3_TG",
        "coeff_HTQ6_TOTAL_4_T", "coeff_HTQ6_TOTAL_4_TL", "coeff_HTQ6_TOTAL_4_TG", "coeff_HTQ6_TOTAL_5_T",
        "coeff_HTQ6_TOTAL_5_TL", "coeff_HTQ6_TOTAL_5_TG", "coeff_HTQ6_T", "coeff_HTQ6_TL", "coeff_HTQ6_TG",
        "coeff_HTQ6_TOTAL_6_T", "coeff_HTQ6_TOTAL_6_TL", "coeff_HTQ6_TOTAL_6_TG", "coeff_HTQ6_TOTAL_7_T",
        "coeff_HTQ6_TOTAL_7_TL", "coeff_HTQ6_TOTAL_7_TG", "coeff_HTQ6_TOTAL_8_T", "coeff_HTQ6_TOTAL_8_TL",
        "coeff_HTQ6_TOTAL_8_TG", "coeff_HTQ6_TOTAL_9_T", "coeff_HTQ6_TOTAL_9_TL", "coeff_HTQ6_TOTAL_9_TG",
        "coeff_HTQ6_Odd", "coeff_HTQ6_Even"
    ], "bases": [
        "coeff_HTQ6_TOTAL_0_T", "coeff_HTQ6_TOTAL_1_T", "coeff_HTQ6_TOTAL_2_T", "coeff_HTQ6_TOTAL_3_T",
        "coeff_HTQ6_TOTAL_4_T", "coeff_HTQ6_TOTAL_5_T", "coeff_HTQ6_T", "coeff_HTQ6_TOTAL_6_T", "coeff_HTQ6_TOTAL_7_T",
        "coeff_HTQ6_TOTAL_8_T", "coeff_HTQ6_TOTAL_9_T"
    ], "odd": "coeff_HTQ6_"
    },
    {
        "name": t('markets.totals.goals_quarter', {part: 7}), "sports": [
        "basketball"
    ], "template": "total", "id": 49, "group_id": 3, "dependencies": [
        "coeff_HTQ7_TOTAL_0_T", "coeff_HTQ7_TOTAL_0_TL", "coeff_HTQ7_TOTAL_0_TG", "coeff_HTQ7_TOTAL_1_T",
        "coeff_HTQ7_TOTAL_1_TL", "coeff_HTQ7_TOTAL_1_TG", "coeff_HTQ7_TOTAL_2_T", "coeff_HTQ7_TOTAL_2_TL",
        "coeff_HTQ7_TOTAL_2_TG", "coeff_HTQ7_TOTAL_3_T", "coeff_HTQ7_TOTAL_3_TL", "coeff_HTQ7_TOTAL_3_TG",
        "coeff_HTQ7_TOTAL_4_T", "coeff_HTQ7_TOTAL_4_TL", "coeff_HTQ7_TOTAL_4_TG", "coeff_HTQ7_TOTAL_5_T",
        "coeff_HTQ7_TOTAL_5_TL", "coeff_HTQ7_TOTAL_5_TG", "coeff_HTQ7_TOTAL_6_T", "coeff_HTQ7_TOTAL_6_TL",
        "coeff_HTQ7_TOTAL_6_TG", "coeff_HTQ7_T", "coeff_HTQ7_TL", "coeff_HTQ7_TG", "coeff_HTQ7_TOTAL_7_T",
        "coeff_HTQ7_TOTAL_7_TL", "coeff_HTQ7_TOTAL_7_TG", "coeff_HTQ7_TOTAL_8_T", "coeff_HTQ7_TOTAL_8_TL",
        "coeff_HTQ7_TOTAL_8_TG", "coeff_HTQ7_TOTAL_9_T", "coeff_HTQ7_TOTAL_9_TL", "coeff_HTQ7_TOTAL_9_TG",
        "coeff_HTQ7_Odd", "coeff_HTQ7_Even"
    ], "bases": [
        "coeff_HTQ7_TOTAL_0_T", "coeff_HTQ7_TOTAL_1_T", "coeff_HTQ7_TOTAL_2_T", "coeff_HTQ7_TOTAL_3_T",
        "coeff_HTQ7_TOTAL_4_T", "coeff_HTQ7_TOTAL_5_T", "coeff_HTQ7_TOTAL_6_T", "coeff_HTQ7_T", "coeff_HTQ7_TOTAL_7_T",
        "coeff_HTQ7_TOTAL_8_T", "coeff_HTQ7_TOTAL_9_T"
    ], "odd": "coeff_HTQ7_"
    },
    {
        "name": t('markets.totals.goals_quarter', {part: 8}), "sports": [
        "basketball"
    ], "template": "total", "id": 50, "group_id": 3, "dependencies": [
        "coeff_HTQ8_TOTAL_0_T", "coeff_HTQ8_TOTAL_0_TL", "coeff_HTQ8_TOTAL_0_TG", "coeff_HTQ8_TOTAL_1_T",
        "coeff_HTQ8_TOTAL_1_TL", "coeff_HTQ8_TOTAL_1_TG", "coeff_HTQ8_TOTAL_2_T", "coeff_HTQ8_TOTAL_2_TL",
        "coeff_HTQ8_TOTAL_2_TG", "coeff_HTQ8_TOTAL_3_T", "coeff_HTQ8_TOTAL_3_TL", "coeff_HTQ8_TOTAL_3_TG",
        "coeff_HTQ8_TOTAL_4_T", "coeff_HTQ8_TOTAL_4_TL", "coeff_HTQ8_TOTAL_4_TG", "coeff_HTQ8_TOTAL_5_T",
        "coeff_HTQ8_TOTAL_5_TL", "coeff_HTQ8_TOTAL_5_TG", "coeff_HTQ8_TOTAL_6_T", "coeff_HTQ8_TOTAL_6_TL",
        "coeff_HTQ8_TOTAL_6_TG", "coeff_HTQ8_TOTAL_7_T", "coeff_HTQ8_TOTAL_7_TL", "coeff_HTQ8_TOTAL_7_TG",
        "coeff_HTQ8_T", "coeff_HTQ8_TL", "coeff_HTQ8_TG", "coeff_HTQ8_TOTAL_8_T", "coeff_HTQ8_TOTAL_8_TL",
        "coeff_HTQ8_TOTAL_8_TG", "coeff_HTQ8_TOTAL_9_T", "coeff_HTQ8_TOTAL_9_TL", "coeff_HTQ8_TOTAL_9_TG",
        "coeff_HTQ8_Odd", "coeff_HTQ8_Even"
    ], "bases": [
        "coeff_HTQ8_TOTAL_0_T", "coeff_HTQ8_TOTAL_1_T", "coeff_HTQ8_TOTAL_2_T", "coeff_HTQ8_TOTAL_3_T",
        "coeff_HTQ8_TOTAL_4_T", "coeff_HTQ8_TOTAL_5_T", "coeff_HTQ8_TOTAL_6_T", "coeff_HTQ8_TOTAL_7_T", "coeff_HTQ8_T",
        "coeff_HTQ8_TOTAL_8_T", "coeff_HTQ8_TOTAL_9_T"
    ], "odd": "coeff_HTQ8_"
    },
    {
        "name": t('markets.totals.goals_quarter', {part: 9}), "sports": [
        "basketball"
    ], "template": "total", "id": 51, "group_id": 3, "dependencies": [
        "coeff_HTQ9_TOTAL_0_T", "coeff_HTQ9_TOTAL_0_TL", "coeff_HTQ9_TOTAL_0_TG", "coeff_HTQ9_TOTAL_1_T",
        "coeff_HTQ9_TOTAL_1_TL", "coeff_HTQ9_TOTAL_1_TG", "coeff_HTQ9_TOTAL_2_T", "coeff_HTQ9_TOTAL_2_TL",
        "coeff_HTQ9_TOTAL_2_TG", "coeff_HTQ9_TOTAL_3_T", "coeff_HTQ9_TOTAL_3_TL", "coeff_HTQ9_TOTAL_3_TG",
        "coeff_HTQ9_TOTAL_4_T", "coeff_HTQ9_TOTAL_4_TL", "coeff_HTQ9_TOTAL_4_TG", "coeff_HTQ9_TOTAL_5_T",
        "coeff_HTQ9_TOTAL_5_TL", "coeff_HTQ9_TOTAL_5_TG", "coeff_HTQ9_TOTAL_6_T", "coeff_HTQ9_TOTAL_6_TL",
        "coeff_HTQ9_TOTAL_6_TG", "coeff_HTQ9_TOTAL_7_T", "coeff_HTQ9_TOTAL_7_TL", "coeff_HTQ9_TOTAL_7_TG",
        "coeff_HTQ9_TOTAL_8_T", "coeff_HTQ9_TOTAL_8_TL", "coeff_HTQ9_TOTAL_8_TG", "coeff_HTQ9_T", "coeff_HTQ9_TL",
        "coeff_HTQ9_TG", "coeff_HTQ9_TOTAL_9_T", "coeff_HTQ9_TOTAL_9_TL", "coeff_HTQ9_TOTAL_9_TG", "coeff_HTQ9_Odd",
        "coeff_HTQ9_Even"
    ], "bases": [
        "coeff_HTQ9_TOTAL_0_T", "coeff_HTQ9_TOTAL_1_T", "coeff_HTQ9_TOTAL_2_T", "coeff_HTQ9_TOTAL_3_T",
        "coeff_HTQ9_TOTAL_4_T", "coeff_HTQ9_TOTAL_5_T", "coeff_HTQ9_TOTAL_6_T", "coeff_HTQ9_TOTAL_7_T",
        "coeff_HTQ9_TOTAL_8_T", "coeff_HTQ9_T", "coeff_HTQ9_TOTAL_9_T"
    ], "odd": "coeff_HTQ9_"
    },
    {
        "name": t('markets.totals.goals_quarter', {part: 10}), "sports": [
        "basketball"
    ], "template": "total", "id": 52, "group_id": 3, "dependencies": [
        "coeff_HTQ10_TOTAL_0_T", "coeff_HTQ10_TOTAL_0_TL", "coeff_HTQ10_TOTAL_0_TG", "coeff_HTQ10_TOTAL_1_T",
        "coeff_HTQ10_TOTAL_1_TL", "coeff_HTQ10_TOTAL_1_TG", "coeff_HTQ10_TOTAL_2_T", "coeff_HTQ10_TOTAL_2_TL",
        "coeff_HTQ10_TOTAL_2_TG", "coeff_HTQ10_TOTAL_3_T", "coeff_HTQ10_TOTAL_3_TL", "coeff_HTQ10_TOTAL_3_TG",
        "coeff_HTQ10_TOTAL_4_T", "coeff_HTQ10_TOTAL_4_TL", "coeff_HTQ10_TOTAL_4_TG", "coeff_HTQ10_TOTAL_5_T",
        "coeff_HTQ10_TOTAL_5_TL", "coeff_HTQ10_TOTAL_5_TG", "coeff_HTQ10_TOTAL_6_T", "coeff_HTQ10_TOTAL_6_TL",
        "coeff_HTQ10_TOTAL_6_TG", "coeff_HTQ10_TOTAL_7_T", "coeff_HTQ10_TOTAL_7_TL", "coeff_HTQ10_TOTAL_7_TG",
        "coeff_HTQ10_TOTAL_8_T", "coeff_HTQ10_TOTAL_8_TL", "coeff_HTQ10_TOTAL_8_TG", "coeff_HTQ10_TOTAL_9_T",
        "coeff_HTQ10_TOTAL_9_TL", "coeff_HTQ10_TOTAL_9_TG", "coeff_HTQ10_Odd", "coeff_HTQ10_Even"
    ], "bases": [
        "coeff_HTQ10_TOTAL_0_T", "coeff_HTQ10_TOTAL_1_T", "coeff_HTQ10_TOTAL_2_T", "coeff_HTQ10_TOTAL_3_T",
        "coeff_HTQ10_TOTAL_4_T", "coeff_HTQ10_TOTAL_5_T", "coeff_HTQ10_TOTAL_6_T", "coeff_HTQ10_TOTAL_7_T",
        "coeff_HTQ10_TOTAL_8_T", "coeff_HTQ10_TOTAL_9_T"
    ], "odd": "coeff_HTQ10_"
    },
    {
        "name": t('markets.totals.goals_half', {part: 1}), "sports": [
        "basketball"
    ], "template": "total", "id": 53, "group_id": 3, "dependencies": [
        "coeff_HT1_TOTAL_0_T", "coeff_HT1_TOTAL_0_TL", "coeff_HT1_TOTAL_0_TG", "coeff_HT1_T", "coeff_HT1_TL",
        "coeff_HT1_TG", "coeff_HT1_TOTAL_1_T", "coeff_HT1_TOTAL_1_TL", "coeff_HT1_TOTAL_1_TG", "coeff_HT1_TOTAL_2_T",
        "coeff_HT1_TOTAL_2_TL", "coeff_HT1_TOTAL_2_TG", "coeff_HT1_TOTAL_3_T", "coeff_HT1_TOTAL_3_TL",
        "coeff_HT1_TOTAL_3_TG", "coeff_HT1_TOTAL_4_T", "coeff_HT1_TOTAL_4_TL", "coeff_HT1_TOTAL_4_TG",
        "coeff_HT1_TOTAL_5_T", "coeff_HT1_TOTAL_5_TL", "coeff_HT1_TOTAL_5_TG", "coeff_HT1_TOTAL_6_T",
        "coeff_HT1_TOTAL_6_TL", "coeff_HT1_TOTAL_6_TG", "coeff_HT1_TOTAL_7_T", "coeff_HT1_TOTAL_7_TL",
        "coeff_HT1_TOTAL_7_TG", "coeff_HT1_TOTAL_8_T", "coeff_HT1_TOTAL_8_TL", "coeff_HT1_TOTAL_8_TG",
        "coeff_HT1_TOTAL_9_T", "coeff_HT1_TOTAL_9_TL", "coeff_HT1_TOTAL_9_TG", "coeff_HT1_Odd", "coeff_HT1_Even"
    ], "bases": [
        "coeff_HT1_TOTAL_0_T", "coeff_HT1_T", "coeff_HT1_TOTAL_1_T", "coeff_HT1_TOTAL_2_T",
        "coeff_HT1_TOTAL_3_T", "coeff_HT1_TOTAL_4_T", "coeff_HT1_TOTAL_5_T", "coeff_HT1_TOTAL_6_T",
        "coeff_HT1_TOTAL_7_T", "coeff_HT1_TOTAL_8_T", "coeff_HT1_TOTAL_9_T"
    ], "odd": "coeff_HT1_"
    },
    {
        "name": t('markets.totals.goals_part', {part: 1}), "sports": [
        "volleyball", "beach_volleyball"
    ], "template": "total", "id": 54, "group_id": 3, "dependencies": [
        "coeff_HTS1_TOTAL_0_T", "coeff_HTS1_TOTAL_0_TL", "coeff_HTS1_TOTAL_0_TG", "coeff_HTS1_T", "coeff_HTS1_TL",
        "coeff_HTS1_TG", "coeff_HTS1_TOTAL_1_T", "coeff_HTS1_TOTAL_1_TL", "coeff_HTS1_TOTAL_1_TG",
        "coeff_HTS1_TOTAL_2_T", "coeff_HTS1_TOTAL_2_TL", "coeff_HTS1_TOTAL_2_TG", "coeff_HTS1_TOTAL_3_T",
        "coeff_HTS1_TOTAL_3_TL", "coeff_HTS1_TOTAL_3_TG", "coeff_HTS1_TOTAL_4_T", "coeff_HTS1_TOTAL_4_TL",
        "coeff_HTS1_TOTAL_4_TG", "coeff_HTS1_TOTAL_5_T", "coeff_HTS1_TOTAL_5_TL", "coeff_HTS1_TOTAL_5_TG",
        "coeff_HTS1_TOTAL_6_T", "coeff_HTS1_TOTAL_6_TL", "coeff_HTS1_TOTAL_6_TG", "coeff_HTS1_TOTAL_7_T",
        "coeff_HTS1_TOTAL_7_TL", "coeff_HTS1_TOTAL_7_TG", "coeff_HTS1_TOTAL_8_T", "coeff_HTS1_TOTAL_8_TL",
        "coeff_HTS1_TOTAL_8_TG", "coeff_HTS1_TOTAL_9_T", "coeff_HTS1_TOTAL_9_TL", "coeff_HTS1_TOTAL_9_TG",
        "coeff_HTS1_Odd", "coeff_HTS1_Even"
    ], "bases": [
        "coeff_HTS1_TOTAL_0_T", "coeff_HTS1_T", "coeff_HTS1_TOTAL_1_T", "coeff_HTS1_TOTAL_2_T",
        "coeff_HTS1_TOTAL_3_T", "coeff_HTS1_TOTAL_4_T", "coeff_HTS1_TOTAL_5_T", "coeff_HTS1_TOTAL_6_T",
        "coeff_HTS1_TOTAL_7_T", "coeff_HTS1_TOTAL_8_T", "coeff_HTS1_TOTAL_9_T"
    ], "odd": "coeff_HTS1_"
    },
    {
        "name": t('markets.totals.goals_part', {part: 2}), "sports": [
        "volleyball", "beach_volleyball"
    ], "template": "total", "id": 55, "group_id": 3, "dependencies": [
        "coeff_HTS2_TOTAL_0_T", "coeff_HTS2_TOTAL_0_TL", "coeff_HTS2_TOTAL_0_TG", "coeff_HTS2_TOTAL_1_T",
        "coeff_HTS2_TOTAL_1_TL", "coeff_HTS2_TOTAL_1_TG", "coeff_HTS2_T", "coeff_HTS2_TL", "coeff_HTS2_TG",
        "coeff_HTS2_TOTAL_2_T", "coeff_HTS2_TOTAL_2_TL", "coeff_HTS2_TOTAL_2_TG", "coeff_HTS2_TOTAL_3_T",
        "coeff_HTS2_TOTAL_3_TL", "coeff_HTS2_TOTAL_3_TG", "coeff_HTS2_TOTAL_4_T", "coeff_HTS2_TOTAL_4_TL",
        "coeff_HTS2_TOTAL_4_TG", "coeff_HTS2_TOTAL_5_T", "coeff_HTS2_TOTAL_5_TL", "coeff_HTS2_TOTAL_5_TG",
        "coeff_HTS2_TOTAL_6_T", "coeff_HTS2_TOTAL_6_TL", "coeff_HTS2_TOTAL_6_TG", "coeff_HTS2_TOTAL_7_T",
        "coeff_HTS2_TOTAL_7_TL", "coeff_HTS2_TOTAL_7_TG", "coeff_HTS2_TOTAL_8_T", "coeff_HTS2_TOTAL_8_TL",
        "coeff_HTS2_TOTAL_8_TG", "coeff_HTS2_TOTAL_9_T", "coeff_HTS2_TOTAL_9_TL", "coeff_HTS2_TOTAL_9_TG",
        "coeff_HTS2_Odd", "coeff_HTS2_Even"
    ], "bases": [
        "coeff_HTS2_TOTAL_0_T", "coeff_HTS2_TOTAL_1_T", "coeff_HTS2_T", "coeff_HTS2_TOTAL_2_T",
        "coeff_HTS2_TOTAL_3_T", "coeff_HTS2_TOTAL_4_T", "coeff_HTS2_TOTAL_5_T", "coeff_HTS2_TOTAL_6_T",
        "coeff_HTS2_TOTAL_7_T", "coeff_HTS2_TOTAL_8_T", "coeff_HTS2_TOTAL_9_T"
    ], "odd": "coeff_HTS2_"
    },
    {
        "name": t('markets.totals.goals_part', {part: 3}), "sports": [
        "volleyball", "beach_volleyball"
    ], "template": "total", "id": 56, "group_id": 3, "dependencies": [
        "coeff_HTS3_TOTAL_0_T", "coeff_HTS3_TOTAL_0_TL", "coeff_HTS3_TOTAL_0_TG", "coeff_HTS3_TOTAL_1_T",
        "coeff_HTS3_TOTAL_1_TL", "coeff_HTS3_TOTAL_1_TG", "coeff_HTS3_TOTAL_2_T", "coeff_HTS3_TOTAL_2_TL",
        "coeff_HTS3_TOTAL_2_TG", "coeff_HTS3_T", "coeff_HTS3_TL", "coeff_HTS3_TG", "coeff_HTS3_TOTAL_3_T",
        "coeff_HTS3_TOTAL_3_TL", "coeff_HTS3_TOTAL_3_TG", "coeff_HTS3_TOTAL_4_T", "coeff_HTS3_TOTAL_4_TL",
        "coeff_HTS3_TOTAL_4_TG", "coeff_HTS3_TOTAL_5_T", "coeff_HTS3_TOTAL_5_TL", "coeff_HTS3_TOTAL_5_TG",
        "coeff_HTS3_TOTAL_6_T", "coeff_HTS3_TOTAL_6_TL", "coeff_HTS3_TOTAL_6_TG", "coeff_HTS3_TOTAL_7_T",
        "coeff_HTS3_TOTAL_7_TL", "coeff_HTS3_TOTAL_7_TG", "coeff_HTS3_TOTAL_8_T", "coeff_HTS3_TOTAL_8_TL",
        "coeff_HTS3_TOTAL_8_TG", "coeff_HTS3_TOTAL_9_T", "coeff_HTS3_TOTAL_9_TL", "coeff_HTS3_TOTAL_9_TG",
        "coeff_HTS3_Odd", "coeff_HTS3_Even"
    ], "bases": [
        "coeff_HTS3_TOTAL_0_T", "coeff_HTS3_TOTAL_1_T", "coeff_HTS3_TOTAL_2_T", "coeff_HTS3_T",
        "coeff_HTS3_TOTAL_3_T", "coeff_HTS3_TOTAL_4_T", "coeff_HTS3_TOTAL_5_T", "coeff_HTS3_TOTAL_6_T",
        "coeff_HTS3_TOTAL_7_T", "coeff_HTS3_TOTAL_8_T", "coeff_HTS3_TOTAL_9_T"
    ], "odd": "coeff_HTS3_"
    },
    {
        "name": t('markets.totals.goals_part', {part: 4}), "sports": [
        "volleyball", "beach_volleyball"
    ], "template": "total", "id": 57, "group_id": 3, "dependencies": [
        "coeff_HTS4_TOTAL_0_T", "coeff_HTS4_TOTAL_0_TL", "coeff_HTS4_TOTAL_0_TG", "coeff_HTS4_TOTAL_1_T",
        "coeff_HTS4_TOTAL_1_TL", "coeff_HTS4_TOTAL_1_TG", "coeff_HTS4_TOTAL_2_T", "coeff_HTS4_TOTAL_2_TL",
        "coeff_HTS4_TOTAL_2_TG", "coeff_HTS4_TOTAL_3_T", "coeff_HTS4_TOTAL_3_TL", "coeff_HTS4_TOTAL_3_TG",
        "coeff_HTS4_T", "coeff_HTS4_TL", "coeff_HTS4_TG", "coeff_HTS4_TOTAL_4_T", "coeff_HTS4_TOTAL_4_TL",
        "coeff_HTS4_TOTAL_4_TG", "coeff_HTS4_TOTAL_5_T", "coeff_HTS4_TOTAL_5_TL", "coeff_HTS4_TOTAL_5_TG",
        "coeff_HTS4_TOTAL_6_T", "coeff_HTS4_TOTAL_6_TL", "coeff_HTS4_TOTAL_6_TG", "coeff_HTS4_TOTAL_7_T",
        "coeff_HTS4_TOTAL_7_TL", "coeff_HTS4_TOTAL_7_TG", "coeff_HTS4_TOTAL_8_T", "coeff_HTS4_TOTAL_8_TL",
        "coeff_HTS4_TOTAL_8_TG", "coeff_HTS4_TOTAL_9_T", "coeff_HTS4_TOTAL_9_TL", "coeff_HTS4_TOTAL_9_TG",
        "coeff_HTS4_Odd", "coeff_HTS4_Even"
    ], "bases": [
        "coeff_HTS4_TOTAL_0_T", "coeff_HTS4_TOTAL_1_T", "coeff_HTS4_TOTAL_2_T", "coeff_HTS4_TOTAL_3_T",
        "coeff_HTS4_T", "coeff_HTS4_TOTAL_4_T", "coeff_HTS4_TOTAL_5_T", "coeff_HTS4_TOTAL_6_T", "coeff_HTS4_TOTAL_7_T",
        "coeff_HTS4_TOTAL_8_T", "coeff_HTS4_TOTAL_9_T"
    ], "odd": "coeff_HTS4_"
    },
    {
        "name": t('markets.totals.goals_part', {part: 5}), "sports": [
        "volleyball", "beach_volleyball"
    ], "template": "total", "id": 58, "group_id": 3, "dependencies": [
        "coeff_HTS5_TOTAL_0_T", "coeff_HTS5_TOTAL_0_TL", "coeff_HTS5_TOTAL_0_TG", "coeff_HTS5_TOTAL_1_T",
        "coeff_HTS5_TOTAL_1_TL", "coeff_HTS5_TOTAL_1_TG", "coeff_HTS5_TOTAL_2_T", "coeff_HTS5_TOTAL_2_TL",
        "coeff_HTS5_TOTAL_2_TG", "coeff_HTS5_TOTAL_3_T", "coeff_HTS5_TOTAL_3_TL", "coeff_HTS5_TOTAL_3_TG",
        "coeff_HTS5_TOTAL_4_T", "coeff_HTS5_TOTAL_4_TL", "coeff_HTS5_TOTAL_4_TG", "coeff_HTS5_T", "coeff_HTS5_TL",
        "coeff_HTS5_TG", "coeff_HTS5_TOTAL_5_T", "coeff_HTS5_TOTAL_5_TL", "coeff_HTS5_TOTAL_5_TG",
        "coeff_HTS5_TOTAL_6_T", "coeff_HTS5_TOTAL_6_TL", "coeff_HTS5_TOTAL_6_TG", "coeff_HTS5_TOTAL_7_T",
        "coeff_HTS5_TOTAL_7_TL", "coeff_HTS5_TOTAL_7_TG", "coeff_HTS5_TOTAL_8_T", "coeff_HTS5_TOTAL_8_TL",
        "coeff_HTS5_TOTAL_8_TG", "coeff_HTS5_TOTAL_9_T", "coeff_HTS5_TOTAL_9_TL", "coeff_HTS5_TOTAL_9_TG",
        "coeff_HTS5_Odd", "coeff_HTS5_Even"
    ], "bases": [
        "coeff_HTS5_TOTAL_0_T", "coeff_HTS5_TOTAL_1_T", "coeff_HTS5_TOTAL_2_T", "coeff_HTS5_TOTAL_3_T",
        "coeff_HTS5_TOTAL_4_T", "coeff_HTS5_T", "coeff_HTS5_TOTAL_5_T", "coeff_HTS5_TOTAL_6_T", "coeff_HTS5_TOTAL_7_T",
        "coeff_HTS5_TOTAL_8_T", "coeff_HTS5_TOTAL_9_T"
    ], "odd": "coeff_HTS5_"
    },
    {
        "name": {
            "default": t('markets.totals.goals_', {team: '{H}'}),
            "football": t('markets.totals.points_', {team: '{H}'}),
            "snooker": t('markets.totals.frames_', {team: '{H}'}),
            "statistics": t('markets.totals.total_', {team: '{H}'})
        }, "template": "total", "individual": true, "id": 59, "group_id": 3, "dependencies": [
        "coeff_TOTAL1_FT_HOME_T", "coeff_TOTAL1_FT_HOME_TL", "coeff_TOTAL1_FT_HOME_TG", "coeff_TOTAL2_FT_HOME_T",
        "coeff_TOTAL2_FT_HOME_TL", "coeff_TOTAL2_FT_HOME_TG", "coeff_TOTAL3_FT_HOME_T", "coeff_TOTAL3_FT_HOME_TL",
        "coeff_TOTAL3_FT_HOME_TG", "coeff_TOTAL4_FT_HOME_T", "coeff_TOTAL4_FT_HOME_TL", "coeff_TOTAL4_FT_HOME_TG",
        "coeff_TOTAL5_FT_HOME_T", "coeff_TOTAL5_FT_HOME_TL", "coeff_TOTAL5_FT_HOME_TG", "coeff_TOTAL6_FT_HOME_T",
        "coeff_TOTAL6_FT_HOME_TL", "coeff_TOTAL6_FT_HOME_TG", "coeff_TOTAL7_FT_HOME_T", "coeff_TOTAL7_FT_HOME_TL",
        "coeff_TOTAL7_FT_HOME_TG", "coeff_TOTAL8_FT_HOME_T", "coeff_TOTAL8_FT_HOME_TL", "coeff_TOTAL8_FT_HOME_TG",
        "coeff_TOTAL9_FT_HOME_T", "coeff_TOTAL9_FT_HOME_TL", "coeff_TOTAL9_FT_HOME_TG", "coeff_TOTAL_FT_HOME_T",
        "coeff_TOTAL_FT_HOME_TL", "coeff_TOTAL_FT_HOME_TG"
    ], "bases": [
        "coeff_TOTAL1_FT_HOME_T", "coeff_TOTAL2_FT_HOME_T", "coeff_TOTAL3_FT_HOME_T",
        "coeff_TOTAL4_FT_HOME_T", "coeff_TOTAL5_FT_HOME_T", "coeff_TOTAL6_FT_HOME_T", "coeff_TOTAL7_FT_HOME_T",
        "coeff_TOTAL8_FT_HOME_T", "coeff_TOTAL9_FT_HOME_T", "coeff_TOTAL_FT_HOME_T"
    ], "odd": []
    },
    {
        "name": {
            "default": t('markets.totals.goals_', {team: '{A}'}),
            "football": t('markets.totals.points_', {team: '{A}'}),
            "snooker": t('markets.totals.frames_', {team: '{A}'}),
            "statistics": t('markets.totals.total_', {team: '{A}'})
        }, "template": "total", "individual": true, "id": 60, "group_id": 3, "dependencies": [
        "coeff_TOTAL1_FT_AWAY_T", "coeff_TOTAL1_FT_AWAY_TL", "coeff_TOTAL1_FT_AWAY_TG", "coeff_TOTAL2_FT_AWAY_T",
        "coeff_TOTAL2_FT_AWAY_TL", "coeff_TOTAL2_FT_AWAY_TG", "coeff_TOTAL3_FT_AWAY_T", "coeff_TOTAL3_FT_AWAY_TL",
        "coeff_TOTAL3_FT_AWAY_TG", "coeff_TOTAL4_FT_AWAY_T", "coeff_TOTAL4_FT_AWAY_TL", "coeff_TOTAL4_FT_AWAY_TG",
        "coeff_TOTAL5_FT_AWAY_T", "coeff_TOTAL5_FT_AWAY_TL", "coeff_TOTAL5_FT_AWAY_TG", "coeff_TOTAL6_FT_AWAY_T",
        "coeff_TOTAL6_FT_AWAY_TL", "coeff_TOTAL6_FT_AWAY_TG", "coeff_TOTAL7_FT_AWAY_T", "coeff_TOTAL7_FT_AWAY_TL",
        "coeff_TOTAL7_FT_AWAY_TG", "coeff_TOTAL8_FT_AWAY_T", "coeff_TOTAL8_FT_AWAY_TL", "coeff_TOTAL8_FT_AWAY_TG",
        "coeff_TOTAL9_FT_AWAY_T", "coeff_TOTAL9_FT_AWAY_TL", "coeff_TOTAL9_FT_AWAY_TG", "coeff_TOTAL_FT_AWAY_T",
        "coeff_TOTAL_FT_AWAY_TL", "coeff_TOTAL_FT_AWAY_TG"
    ], "bases": [
        "coeff_TOTAL1_FT_AWAY_T", "coeff_TOTAL2_FT_AWAY_T", "coeff_TOTAL3_FT_AWAY_T",
        "coeff_TOTAL4_FT_AWAY_T", "coeff_TOTAL5_FT_AWAY_T", "coeff_TOTAL6_FT_AWAY_T", "coeff_TOTAL7_FT_AWAY_T",
        "coeff_TOTAL8_FT_AWAY_T", "coeff_TOTAL9_FT_AWAY_T", "coeff_TOTAL_FT_AWAY_T"
    ], "odd": []
    },
    {
        "name": t('markets.totals.points_', {team: '{H}'}), "sports": [
        "basketball", "volleyball"
    ], "template": "total", "id": 61, "group_id": 3, "dependencies": [
        "coeff_HOME_TOTAL_0_T", "coeff_HOME_TOTAL_0_TL", "coeff_HOME_TOTAL_0_TG", "coeff_HOME_TOTAL_1_T",
        "coeff_HOME_TOTAL_1_TL", "coeff_HOME_TOTAL_1_TG", "coeff_HOME_TOTAL_2_T", "coeff_HOME_TOTAL_2_TL",
        "coeff_HOME_TOTAL_2_TG", "coeff_HOME_TOTAL_3_T", "coeff_HOME_TOTAL_3_TL", "coeff_HOME_TOTAL_3_TG",
        "coeff_HOME_TOTAL_4_T", "coeff_HOME_TOTAL_4_TL", "coeff_HOME_TOTAL_4_TG", "coeff_HOME_TOTAL_5_T",
        "coeff_HOME_TOTAL_5_TL", "coeff_HOME_TOTAL_5_TG", "coeff_HOME_TOTAL_6_T", "coeff_HOME_TOTAL_6_TL",
        "coeff_HOME_TOTAL_6_TG", "coeff_HOME_TOTAL_7_T", "coeff_HOME_TOTAL_7_TL", "coeff_HOME_TOTAL_7_TG",
        "coeff_HOME_TOTAL_8_T", "coeff_HOME_TOTAL_8_TL", "coeff_HOME_TOTAL_8_TG", "coeff_HOME_TOTAL_9_T",
        "coeff_HOME_TOTAL_9_TL", "coeff_HOME_TOTAL_9_TG"
    ], "bases": [
        "coeff_HOME_TOTAL_0_T", "coeff_HOME_TOTAL_1_T", "coeff_HOME_TOTAL_2_T", "coeff_HOME_TOTAL_3_T",
        "coeff_HOME_TOTAL_4_T", "coeff_HOME_TOTAL_5_T", "coeff_HOME_TOTAL_6_T", "coeff_HOME_TOTAL_7_T",
        "coeff_HOME_TOTAL_8_T", "coeff_HOME_TOTAL_9_T"
    ], "odd": []
    },
    {
        "name": t('markets.totals.points_', {team: '{A}'}), "sports": [
        "basketball", "volleyball"
    ], "template": "total", "id": 62, "group_id": 3, "dependencies": [
        "coeff_AWAY_TOTAL_0_T", "coeff_AWAY_TOTAL_0_TL", "coeff_AWAY_TOTAL_0_TG", "coeff_AWAY_TOTAL_1_T",
        "coeff_AWAY_TOTAL_1_TL", "coeff_AWAY_TOTAL_1_TG", "coeff_AWAY_TOTAL_2_T", "coeff_AWAY_TOTAL_2_TL",
        "coeff_AWAY_TOTAL_2_TG", "coeff_AWAY_TOTAL_3_T", "coeff_AWAY_TOTAL_3_TL", "coeff_AWAY_TOTAL_3_TG",
        "coeff_AWAY_TOTAL_4_T", "coeff_AWAY_TOTAL_4_TL", "coeff_AWAY_TOTAL_4_TG", "coeff_AWAY_TOTAL_5_T",
        "coeff_AWAY_TOTAL_5_TL", "coeff_AWAY_TOTAL_5_TG", "coeff_AWAY_TOTAL_6_T", "coeff_AWAY_TOTAL_6_TL",
        "coeff_AWAY_TOTAL_6_TG", "coeff_AWAY_TOTAL_7_T", "coeff_AWAY_TOTAL_7_TL", "coeff_AWAY_TOTAL_7_TG",
        "coeff_AWAY_TOTAL_8_T", "coeff_AWAY_TOTAL_8_TL", "coeff_AWAY_TOTAL_8_TG", "coeff_AWAY_TOTAL_9_T",
        "coeff_AWAY_TOTAL_9_TL", "coeff_AWAY_TOTAL_9_TG"
    ], "bases": [
        "coeff_AWAY_TOTAL_0_T", "coeff_AWAY_TOTAL_1_T", "coeff_AWAY_TOTAL_2_T", "coeff_AWAY_TOTAL_3_T",
        "coeff_AWAY_TOTAL_4_T", "coeff_AWAY_TOTAL_5_T", "coeff_AWAY_TOTAL_6_T", "coeff_AWAY_TOTAL_7_T",
        "coeff_AWAY_TOTAL_8_T", "coeff_AWAY_TOTAL_9_T"
    ], "odd": []
    },
    {
        "name": t('markets.totals.points_half_', {team: '{H}', part: 1}), "sports": [
        "basketball"
    ], "template": "total", "id": 63, "group_id": 3, "dependencies": [
        "coeff_HT1_HOME_TOTAL_0_T", "coeff_HT1_HOME_TOTAL_0_TL", "coeff_HT1_HOME_TOTAL_0_TG", "coeff_HT1_HOME_T",
        "coeff_HT1_HOME_TL", "coeff_HT1_HOME_TG", "coeff_HT1_HOME_TOTAL_1_T", "coeff_HT1_HOME_TOTAL_1_TL",
        "coeff_HT1_HOME_TOTAL_1_TG", "coeff_HT1_HOME_TOTAL_2_T", "coeff_HT1_HOME_TOTAL_2_TL",
        "coeff_HT1_HOME_TOTAL_2_TG", "coeff_HT1_HOME_TOTAL_3_T", "coeff_HT1_HOME_TOTAL_3_TL",
        "coeff_HT1_HOME_TOTAL_3_TG", "coeff_HT1_HOME_TOTAL_4_T", "coeff_HT1_HOME_TOTAL_4_TL",
        "coeff_HT1_HOME_TOTAL_4_TG", "coeff_HT1_HOME_TOTAL_5_T", "coeff_HT1_HOME_TOTAL_5_TL",
        "coeff_HT1_HOME_TOTAL_5_TG", "coeff_HT1_HOME_TOTAL_6_T", "coeff_HT1_HOME_TOTAL_6_TL",
        "coeff_HT1_HOME_TOTAL_6_TG", "coeff_HT1_HOME_TOTAL_7_T", "coeff_HT1_HOME_TOTAL_7_TL",
        "coeff_HT1_HOME_TOTAL_7_TG", "coeff_HT1_HOME_TOTAL_8_T", "coeff_HT1_HOME_TOTAL_8_TL",
        "coeff_HT1_HOME_TOTAL_8_TG", "coeff_HT1_HOME_TOTAL_9_T", "coeff_HT1_HOME_TOTAL_9_TL",
        "coeff_HT1_HOME_TOTAL_9_TG"
    ], "bases": [
        "coeff_HT1_HOME_TOTAL_0_T", "coeff_HT1_HOME_T", "coeff_HT1_HOME_TOTAL_1_T", "coeff_HT1_HOME_TOTAL_2_T",
        "coeff_HT1_HOME_TOTAL_3_T", "coeff_HT1_HOME_TOTAL_4_T", "coeff_HT1_HOME_TOTAL_5_T", "coeff_HT1_HOME_TOTAL_6_T",
        "coeff_HT1_HOME_TOTAL_7_T", "coeff_HT1_HOME_TOTAL_8_T", "coeff_HT1_HOME_TOTAL_9_T"
    ], "odd": []
    },
    {
        "name": t('markets.totals.points_half_', {team: '{H}', part: 2}), "sports": [
        "basketball"
    ], "template": "total", "id": 64, "group_id": 3, "dependencies": [
        "coeff_HT2_HOME_TOTAL_0_T", "coeff_HT2_HOME_TOTAL_0_TL", "coeff_HT2_HOME_TOTAL_0_TG",
        "coeff_HT2_HOME_TOTAL_1_T", "coeff_HT2_HOME_TOTAL_1_TL", "coeff_HT2_HOME_TOTAL_1_TG", "coeff_HT2_HOME_T",
        "coeff_HT2_HOME_TL", "coeff_HT2_HOME_TG", "coeff_HT2_HOME_TOTAL_2_T", "coeff_HT2_HOME_TOTAL_2_TL",
        "coeff_HT2_HOME_TOTAL_2_TG", "coeff_HT2_HOME_TOTAL_3_T", "coeff_HT2_HOME_TOTAL_3_TL",
        "coeff_HT2_HOME_TOTAL_3_TG", "coeff_HT2_HOME_TOTAL_4_T", "coeff_HT2_HOME_TOTAL_4_TL",
        "coeff_HT2_HOME_TOTAL_4_TG", "coeff_HT2_HOME_TOTAL_5_T", "coeff_HT2_HOME_TOTAL_5_TL",
        "coeff_HT2_HOME_TOTAL_5_TG", "coeff_HT2_HOME_TOTAL_6_T", "coeff_HT2_HOME_TOTAL_6_TL",
        "coeff_HT2_HOME_TOTAL_6_TG", "coeff_HT2_HOME_TOTAL_7_T", "coeff_HT2_HOME_TOTAL_7_TL",
        "coeff_HT2_HOME_TOTAL_7_TG", "coeff_HT2_HOME_TOTAL_8_T", "coeff_HT2_HOME_TOTAL_8_TL",
        "coeff_HT2_HOME_TOTAL_8_TG", "coeff_HT2_HOME_TOTAL_9_T", "coeff_HT2_HOME_TOTAL_9_TL",
        "coeff_HT2_HOME_TOTAL_9_TG"
    ], "bases": [
        "coeff_HT2_HOME_TOTAL_0_T", "coeff_HT2_HOME_TOTAL_1_T", "coeff_HT2_HOME_T", "coeff_HT2_HOME_TOTAL_2_T",
        "coeff_HT2_HOME_TOTAL_3_T", "coeff_HT2_HOME_TOTAL_4_T", "coeff_HT2_HOME_TOTAL_5_T", "coeff_HT2_HOME_TOTAL_6_T",
        "coeff_HT2_HOME_TOTAL_7_T", "coeff_HT2_HOME_TOTAL_8_T", "coeff_HT2_HOME_TOTAL_9_T"
    ], "odd": []
    },
    {
        "name": t('markets.totals.points_half_', {team: '{A}', part: 1}), "sports": [
        "basketball"
    ], "template": "total", "id": 65, "group_id": 3, "dependencies": [
        "coeff_HT1_AWAY_TOTAL_0_T", "coeff_HT1_AWAY_TOTAL_0_TL", "coeff_HT1_AWAY_TOTAL_0_TG", "coeff_HT1_AWAY_T",
        "coeff_HT1_AWAY_TL", "coeff_HT1_AWAY_TG", "coeff_HT1_AWAY_TOTAL_1_T", "coeff_HT1_AWAY_TOTAL_1_TL",
        "coeff_HT1_AWAY_TOTAL_1_TG", "coeff_HT1_AWAY_TOTAL_2_T", "coeff_HT1_AWAY_TOTAL_2_TL",
        "coeff_HT1_AWAY_TOTAL_2_TG", "coeff_HT1_AWAY_TOTAL_3_T", "coeff_HT1_AWAY_TOTAL_3_TL",
        "coeff_HT1_AWAY_TOTAL_3_TG", "coeff_HT1_AWAY_TOTAL_4_T", "coeff_HT1_AWAY_TOTAL_4_TL",
        "coeff_HT1_AWAY_TOTAL_4_TG", "coeff_HT1_AWAY_TOTAL_5_T", "coeff_HT1_AWAY_TOTAL_5_TL",
        "coeff_HT1_AWAY_TOTAL_5_TG", "coeff_HT1_AWAY_TOTAL_6_T", "coeff_HT1_AWAY_TOTAL_6_TL",
        "coeff_HT1_AWAY_TOTAL_6_TG", "coeff_HT1_AWAY_TOTAL_7_T", "coeff_HT1_AWAY_TOTAL_7_TL",
        "coeff_HT1_AWAY_TOTAL_7_TG", "coeff_HT1_AWAY_TOTAL_8_T", "coeff_HT1_AWAY_TOTAL_8_TL",
        "coeff_HT1_AWAY_TOTAL_8_TG", "coeff_HT1_AWAY_TOTAL_9_T", "coeff_HT1_AWAY_TOTAL_9_TL",
        "coeff_HT1_AWAY_TOTAL_9_TG"
    ], "bases": [
        "coeff_HT1_AWAY_TOTAL_0_T", "coeff_HT1_AWAY_T", "coeff_HT1_AWAY_TOTAL_1_T", "coeff_HT1_AWAY_TOTAL_2_T",
        "coeff_HT1_AWAY_TOTAL_3_T", "coeff_HT1_AWAY_TOTAL_4_T", "coeff_HT1_AWAY_TOTAL_5_T", "coeff_HT1_AWAY_TOTAL_6_T",
        "coeff_HT1_AWAY_TOTAL_7_T", "coeff_HT1_AWAY_TOTAL_8_T", "coeff_HT1_AWAY_TOTAL_9_T"
    ], "odd": []
    },
    {
        "name": t('markets.totals.points_half_', {team: '{A}', part: 2}), "sports": [
        "basketball"
    ], "template": "total", "id": 66, "group_id": 3, "dependencies": [
        "coeff_HT2_AWAY_TOTAL_0_T", "coeff_HT2_AWAY_TOTAL_0_TL", "coeff_HT2_AWAY_TOTAL_0_TG",
        "coeff_HT2_AWAY_TOTAL_1_T", "coeff_HT2_AWAY_TOTAL_1_TL", "coeff_HT2_AWAY_TOTAL_1_TG", "coeff_HT2_AWAY_T",
        "coeff_HT2_AWAY_TL", "coeff_HT2_AWAY_TG", "coeff_HT2_AWAY_TOTAL_2_T", "coeff_HT2_AWAY_TOTAL_2_TL",
        "coeff_HT2_AWAY_TOTAL_2_TG", "coeff_HT2_AWAY_TOTAL_3_T", "coeff_HT2_AWAY_TOTAL_3_TL",
        "coeff_HT2_AWAY_TOTAL_3_TG", "coeff_HT2_AWAY_TOTAL_4_T", "coeff_HT2_AWAY_TOTAL_4_TL",
        "coeff_HT2_AWAY_TOTAL_4_TG", "coeff_HT2_AWAY_TOTAL_5_T", "coeff_HT2_AWAY_TOTAL_5_TL",
        "coeff_HT2_AWAY_TOTAL_5_TG", "coeff_HT2_AWAY_TOTAL_6_T", "coeff_HT2_AWAY_TOTAL_6_TL",
        "coeff_HT2_AWAY_TOTAL_6_TG", "coeff_HT2_AWAY_TOTAL_7_T", "coeff_HT2_AWAY_TOTAL_7_TL",
        "coeff_HT2_AWAY_TOTAL_7_TG", "coeff_HT2_AWAY_TOTAL_8_T", "coeff_HT2_AWAY_TOTAL_8_TL",
        "coeff_HT2_AWAY_TOTAL_8_TG", "coeff_HT2_AWAY_TOTAL_9_T", "coeff_HT2_AWAY_TOTAL_9_TL",
        "coeff_HT2_AWAY_TOTAL_9_TG"
    ], "bases": [
        "coeff_HT2_AWAY_TOTAL_0_T", "coeff_HT2_AWAY_TOTAL_1_T", "coeff_HT2_AWAY_T", "coeff_HT2_AWAY_TOTAL_2_T",
        "coeff_HT2_AWAY_TOTAL_3_T", "coeff_HT2_AWAY_TOTAL_4_T", "coeff_HT2_AWAY_TOTAL_5_T", "coeff_HT2_AWAY_TOTAL_6_T",
        "coeff_HT2_AWAY_TOTAL_7_T", "coeff_HT2_AWAY_TOTAL_8_T", "coeff_HT2_AWAY_TOTAL_9_T"
    ], "odd": []
    },
    {
        "name": t('markets.goals.goals'), "sports": [
        "soccer", "hockey"
    ], "template": "groupped_yes_no_list", "groups": [
        {
            "name": "{H}", "mnemonics": [
            {"title": t('markets.goals.will_score'), "name": "coeff_HIT_1_"},
            {
                "title": {
                    "default": t('markets.goals.score_time', {part: 1}),
                    "hockey": t('markets.goals.score_period', {part: 1})
                }, "name": "coeff_HIT_1_HT1_"
            },
            {
                "title": {
                    "default": t('markets.goals.score_time', {part: 2}),
                    "hockey": t('markets.goals.score_period', {part: 2})
                }, "name": "coeff_HIT_1_HT2_"
            },
            {
                "title": {
                    "default": t('markets.goals.score_times'),
                    "hockey": t('markets.goals.score_periods')
                },
                "name": "coeff_HIT_HOME_IN_BOTH_HT_"
            },
            {"title": t('markets.goals.score_1_goal'), "name": "coeff_HOME_1_GOAL_"},
            {"title": t('markets.goals.score_2_goals'), "name": "coeff_HOME_2_GOALS_"}
        ]
        },
        {
            "name": "{A}", "mnemonics": [
            {"title": t('markets.goals.will_score'), "name": "coeff_HIT_2_"},
            {
                "title": {
                    "default": t('markets.goals.score_time', {part: 1}),
                    "hockey": t('markets.goals.score_period', {part: 1})
                }, "name": "coeff_HIT_2_HT1_"
            },
            {
                "title": {
                    "default": t('markets.goals.score_time', {part: 2}),
                    "hockey": t('markets.goals.score_period', {part: 2})
                }, "name": "coeff_HIT_2_HT2_"
            },
            {
                "title": {
                    "default": t('markets.goals.score_times'),
                    "hockey": t('markets.goals.score_periods')
                },
                "name": "coeff_HIT_AWAY_IN_BOTH_HT_"
            },
            {"title": t('markets.goals.score_1_goal'), "name": "coeff_AWAY_1_GOAL_"},
            {"title": t('markets.goals.score_2_goals'), "name": "coeff_AWAY_2_GOALS_"}
        ]
        },
        {
            "name": t('markets.goals.both'), "mnemonics": [
            {"title": "Забьют", "name_yes": "coeff_WHO_HIT_BH", "name_no": "coeff_WHO_HIT_NH"},
            {
                "title": {
                    "default": t('markets.goals.score_both_time', {part: 1}),
                    "hockey": t('markets.goals.score_both_period', {part: 1})
                }, "name_yes": "coeff_WHO_HIT_HT1_BH", "name_no": "coeff_WHO_HIT_HT1_NH"
            },
            {
                "title": {
                    "default": t('markets.goals.score_both_time', {part: 2}),
                    "hockey": t('markets.goals.score_both_period', {part: 2})
                }, "name_yes": "coeff_WHO_HIT_HT2_BH", "name_no": "coeff_WHO_HIT_HT2_NH"
            },
            {
                "title": {
                    "default": t('markets.goals.score_both_times'),
                    "hockey": t('markets.goals.score_both_periods')
                }, "name": "coeff_GOAL_IN_BOTH_HT_"
            }
        ]
        },
        {
            "name": t('markets.goals.goal_will'), "mnemonics": [
            {"title": t('markets.goals.goals_in_time', {part: 1}), "name": "coeff_HT1_ANY_GOAL_"},
            {"title": t('markets.goals.goals_in_time', {part: 2}), "name": "coeff_HT2_ANY_GOAL_"}
        ]
        }
    ], "id": 67, "group_id": 5, "dependencies": [
        "coeff_HIT_1_YES", "coeff_HIT_1_NO", "coeff_HIT_1_HT1_YES",
        "coeff_HIT_1_HT1_NO", "coeff_HIT_1_HT2_YES", "coeff_HIT_1_HT2_NO", "coeff_HIT_HOME_IN_BOTH_HT_YES",
        "coeff_HIT_HOME_IN_BOTH_HT_NO", "coeff_HOME_1_GOAL_YES", "coeff_HOME_1_GOAL_NO", "coeff_HOME_2_GOALS_YES",
        "coeff_HOME_2_GOALS_NO", "coeff_HIT_2_YES", "coeff_HIT_2_NO", "coeff_HIT_2_HT1_YES", "coeff_HIT_2_HT1_NO",
        "coeff_HIT_2_HT2_YES", "coeff_HIT_2_HT2_NO", "coeff_HIT_AWAY_IN_BOTH_HT_YES", "coeff_HIT_AWAY_IN_BOTH_HT_NO",
        "coeff_AWAY_1_GOAL_YES", "coeff_AWAY_1_GOAL_NO", "coeff_AWAY_2_GOALS_YES", "coeff_AWAY_2_GOALS_NO",
        "coeff_WHO_HIT_BH", "coeff_WHO_HIT_NH", "coeff_WHO_HIT_HT1_BH", "coeff_WHO_HIT_HT1_NH", "coeff_WHO_HIT_HT2_BH",
        "coeff_WHO_HIT_HT2_NH", "coeff_GOAL_IN_BOTH_HT_YES", "coeff_GOAL_IN_BOTH_HT_NO", "coeff_HT1_ANY_GOAL_YES",
        "coeff_HT1_ANY_GOAL_NO", "coeff_HT2_ANY_GOAL_YES", "coeff_HT2_ANY_GOAL_NO"
    ]
    },
    {
        "name": t('markets.goals.goals_done'), "sports": [
        "soccer", "hockey"
    ], "template": "groupped_yes_no_list", "groups": [
        {
            "name": "{H}", "mnemonics": [
            {"title": t('markets.more_than', {number: 1.5}), "name": "coeff_TOTAL_GOALS_DONE_HOME_MORE_1_5_"},
            {"title": t('markets.more_than', {number: 2.5}), "name": "coeff_TOTAL_GOALS_DONE_HOME_MORE_2_5_"},
            {"title": t('markets.more_than', {number: 3.5}), "name": "coeff_TOTAL_GOALS_DONE_HOME_MORE_3_5_"},
            {"title": t('markets.more_than', {number: 4.5}), "name": "coeff_TOTAL_GOALS_DONE_HOME_MORE_4_5_"},
            {"title": t('markets.more_than', {number: 5.5}), "name": "coeff_TOTAL_GOALS_DONE_HOME_MORE_5_5_"},
            {"title": t('markets.more_than', {number: 6.5}), "name": "coeff_TOTAL_GOALS_DONE_HOME_MORE_6_5_"},
            {"title": t('markets.more_than', {number: 7.5}), "name": "coeff_TOTAL_GOALS_DONE_HOME_MORE_7_5_"}
        ]
        },
        {
            "name": "{A}", "mnemonics": [
            {"title": t('markets.more_than', {number: 1.5}), "name": "coeff_TOTAL_GOALS_DONE_AWAY_MORE_1_5_"},
            {"title": t('markets.more_than', {number: 2.5}), "name": "coeff_TOTAL_GOALS_DONE_AWAY_MORE_2_5_"},
            {"title": t('markets.more_than', {number: 3.5}), "name": "coeff_TOTAL_GOALS_DONE_AWAY_MORE_3_5_"},
            {"title": t('markets.more_than', {number: 4.5}), "name": "coeff_TOTAL_GOALS_DONE_AWAY_MORE_4_5_"},
            {"title": t('markets.more_than', {number: 5.5}), "name": "coeff_TOTAL_GOALS_DONE_AWAY_MORE_5_5_"},
            {"title": t('markets.more_than', {number: 6.5}), "name": "coeff_TOTAL_GOALS_DONE_AWAY_MORE_6_5_"},
            {"title": t('markets.more_than', {number: 7.5}), "name": "coeff_TOTAL_GOALS_DONE_AWAY_MORE_7_5_"}
        ]
        }
    ], "id": 68, "group_id": 5, "dependencies": [
        "coeff_TOTAL_GOALS_DONE_HOME_MORE_1_5_YES",
        "coeff_TOTAL_GOALS_DONE_HOME_MORE_1_5_NO", "coeff_TOTAL_GOALS_DONE_HOME_MORE_2_5_YES",
        "coeff_TOTAL_GOALS_DONE_HOME_MORE_2_5_NO", "coeff_TOTAL_GOALS_DONE_HOME_MORE_3_5_YES",
        "coeff_TOTAL_GOALS_DONE_HOME_MORE_3_5_NO", "coeff_TOTAL_GOALS_DONE_HOME_MORE_4_5_YES",
        "coeff_TOTAL_GOALS_DONE_HOME_MORE_4_5_NO", "coeff_TOTAL_GOALS_DONE_HOME_MORE_5_5_YES",
        "coeff_TOTAL_GOALS_DONE_HOME_MORE_5_5_NO", "coeff_TOTAL_GOALS_DONE_HOME_MORE_6_5_YES",
        "coeff_TOTAL_GOALS_DONE_HOME_MORE_6_5_NO", "coeff_TOTAL_GOALS_DONE_HOME_MORE_7_5_YES",
        "coeff_TOTAL_GOALS_DONE_HOME_MORE_7_5_NO", "coeff_TOTAL_GOALS_DONE_AWAY_MORE_1_5_YES",
        "coeff_TOTAL_GOALS_DONE_AWAY_MORE_1_5_NO", "coeff_TOTAL_GOALS_DONE_AWAY_MORE_2_5_YES",
        "coeff_TOTAL_GOALS_DONE_AWAY_MORE_2_5_NO", "coeff_TOTAL_GOALS_DONE_AWAY_MORE_3_5_YES",
        "coeff_TOTAL_GOALS_DONE_AWAY_MORE_3_5_NO", "coeff_TOTAL_GOALS_DONE_AWAY_MORE_4_5_YES",
        "coeff_TOTAL_GOALS_DONE_AWAY_MORE_4_5_NO", "coeff_TOTAL_GOALS_DONE_AWAY_MORE_5_5_YES",
        "coeff_TOTAL_GOALS_DONE_AWAY_MORE_5_5_NO", "coeff_TOTAL_GOALS_DONE_AWAY_MORE_6_5_YES",
        "coeff_TOTAL_GOALS_DONE_AWAY_MORE_6_5_NO", "coeff_TOTAL_GOALS_DONE_AWAY_MORE_7_5_YES",
        "coeff_TOTAL_GOALS_DONE_AWAY_MORE_7_5_NO"
    ]
    },
    {
        "name": t('markets.goals.goals_missed'), "sports": [
        "soccer", "hockey"
    ], "template": "groupped_yes_no_list", "groups": [
        {
            "name": "{H}", "mnemonics": [
            {"title": t('markets.more_than', {number: 1.5}), "name": "coeff_TOTAL_GOALS_MISS_HOME_MORE_1_5_"},
            {"title": t('markets.more_than', {number: 2.5}), "name": "coeff_TOTAL_GOALS_MISS_HOME_MORE_2_5_"},
            {"title": t('markets.more_than', {number: 3.5}), "name": "coeff_TOTAL_GOALS_MISS_HOME_MORE_3_5_"},
            {"title": t('markets.more_than', {number: 4.5}), "name": "coeff_TOTAL_GOALS_MISS_HOME_MORE_4_5_"},
            {"title": t('markets.more_than', {number: 5.5}), "name": "coeff_TOTAL_GOALS_MISS_HOME_MORE_5_5_"},
            {"title": t('markets.more_than', {number: 6.5}), "name": "coeff_TOTAL_GOALS_MISS_HOME_MORE_6_5_"},
            {"title": t('markets.more_than', {number: 7.5}), "name": "coeff_TOTAL_GOALS_MISS_HOME_MORE_7_5_"}
        ]
        },
        {
            "name": "{A}", "mnemonics": [
            {"title": t('markets.more_than', {number: 1.5}), "name": "coeff_TOTAL_GOALS_MISS_AWAY_MORE_1_5_"},
            {"title": t('markets.more_than', {number: 2.5}), "name": "coeff_TOTAL_GOALS_MISS_AWAY_MORE_2_5_"},
            {"title": t('markets.more_than', {number: 3.5}), "name": "coeff_TOTAL_GOALS_MISS_AWAY_MORE_3_5_"},
            {"title": t('markets.more_than', {number: 4.5}), "name": "coeff_TOTAL_GOALS_MISS_AWAY_MORE_4_5_"},
            {"title": t('markets.more_than', {number: 5.5}), "name": "coeff_TOTAL_GOALS_MISS_AWAY_MORE_5_5_"},
            {"title": t('markets.more_than', {number: 6.5}), "name": "coeff_TOTAL_GOALS_MISS_AWAY_MORE_6_5_"},
            {"title": t('markets.more_than', {number: 7.5}), "name": "coeff_TOTAL_GOALS_MISS_AWAY_MORE_7_5_"}
        ]
        }
    ], "id": 69, "group_id": 5, "dependencies": [
        "coeff_TOTAL_GOALS_MISS_HOME_MORE_1_5_YES",
        "coeff_TOTAL_GOALS_MISS_HOME_MORE_1_5_NO", "coeff_TOTAL_GOALS_MISS_HOME_MORE_2_5_YES",
        "coeff_TOTAL_GOALS_MISS_HOME_MORE_2_5_NO", "coeff_TOTAL_GOALS_MISS_HOME_MORE_3_5_YES",
        "coeff_TOTAL_GOALS_MISS_HOME_MORE_3_5_NO", "coeff_TOTAL_GOALS_MISS_HOME_MORE_4_5_YES",
        "coeff_TOTAL_GOALS_MISS_HOME_MORE_4_5_NO", "coeff_TOTAL_GOALS_MISS_HOME_MORE_5_5_YES",
        "coeff_TOTAL_GOALS_MISS_HOME_MORE_5_5_NO", "coeff_TOTAL_GOALS_MISS_HOME_MORE_6_5_YES",
        "coeff_TOTAL_GOALS_MISS_HOME_MORE_6_5_NO", "coeff_TOTAL_GOALS_MISS_HOME_MORE_7_5_YES",
        "coeff_TOTAL_GOALS_MISS_HOME_MORE_7_5_NO", "coeff_TOTAL_GOALS_MISS_AWAY_MORE_1_5_YES",
        "coeff_TOTAL_GOALS_MISS_AWAY_MORE_1_5_NO", "coeff_TOTAL_GOALS_MISS_AWAY_MORE_2_5_YES",
        "coeff_TOTAL_GOALS_MISS_AWAY_MORE_2_5_NO", "coeff_TOTAL_GOALS_MISS_AWAY_MORE_3_5_YES",
        "coeff_TOTAL_GOALS_MISS_AWAY_MORE_3_5_NO", "coeff_TOTAL_GOALS_MISS_AWAY_MORE_4_5_YES",
        "coeff_TOTAL_GOALS_MISS_AWAY_MORE_4_5_NO", "coeff_TOTAL_GOALS_MISS_AWAY_MORE_5_5_YES",
        "coeff_TOTAL_GOALS_MISS_AWAY_MORE_5_5_NO", "coeff_TOTAL_GOALS_MISS_AWAY_MORE_6_5_YES",
        "coeff_TOTAL_GOALS_MISS_AWAY_MORE_6_5_NO", "coeff_TOTAL_GOALS_MISS_AWAY_MORE_7_5_YES",
        "coeff_TOTAL_GOALS_MISS_AWAY_MORE_7_5_NO"
    ]
    },
    {
        "name": t('markets.goals.next'), "template": "simple_list", "sports": [
        "soccer", "hockey"
    ], "id": 70, "group_id": 5, "dependencies": [
        "coeff_FGLG_FG1", "coeff_NG2_NG1", "coeff_NG3_NG1", "coeff_NG4_NG1",
        "coeff_NG5_NG1", "coeff_NG6_NG1", "coeff_NG7_NG1", "coeff_NG8_NG1", "coeff_NG9_NG1", "coeff_NG10_NG1",
        "coeff_NG11_NG1", "coeff_NG12_NG1"
    ], "rows": [
        {"title": "{H}", "name": "coeff_FGLG_FG1"},
        {"title": "{A}", "name": "coeff_FGLG_FG2"},
        {"title": t('markets.goals.nobody'), "name": "coeff_FGLG_NO_GOAL"},
        {"title": "{H}", "name": "coeff_NG2_NG1"},
        {"title": "{A}", "name": "coeff_NG2_NG2"},
        {"title": t('markets.goals.nobody'), "name": "coeff_NG2_NO_GOAL"},
        {"title": "{H}", "name": "coeff_NG3_NG1"},
        {"title": "{A}", "name": "coeff_NG3_NG2"},
        {"title": t('markets.goals.nobody'), "name": "coeff_NG3_NO_GOAL"},
        {"title": "{H}", "name": "coeff_NG4_NG1"},
        {"title": "{A}", "name": "coeff_NG4_NG2"},
        {"title": t('markets.goals.nobody'), "name": "coeff_NG4_NO_GOAL"},
        {"title": "{H}", "name": "coeff_NG5_NG1"},
        {"title": "{A}", "name": "coeff_NG5_NG2"},
        {"title": t('markets.goals.nobody'), "name": "coeff_NG5_NO_GOAL"},
        {"title": "{H}", "name": "coeff_NG6_NG1"},
        {"title": "{A}", "name": "coeff_NG6_NG2"},
        {"title": t('markets.goals.nobody'), "name": "coeff_NG6_NO_GOAL"},
        {"title": "{H}", "name": "coeff_NG7_NG1"},
        {"title": "{A}", "name": "coeff_NG7_NG2"},
        {"title": t('markets.goals.nobody'), "name": "coeff_NG7_NO_GOAL"},
        {"title": "{H}", "name": "coeff_NG8_NG1"},
        {"title": "{A}", "name": "coeff_NG8_NG2"},
        {"title": t('markets.goals.nobody'), "name": "coeff_NG8_NO_GOAL"},
        {"title": "{H}", "name": "coeff_NG9_NG1"},
        {"title": "{A}", "name": "coeff_NG9_NG2"},
        {"title": t('markets.goals.nobody'), "name": "coeff_NG9_NO_GOAL"},
        {"title": "{H}", "name": "coeff_NG10_NG1"},
        {"title": "{A}", "name": "coeff_NG10_NG2"},
        {"title": t('markets.goals.nobody'), "name": "coeff_NG10_NO_GOAL"},
        {"title": "{H}", "name": "coeff_NG11_NG1"},
        {"title": "{A}", "name": "coeff_NG11_NG2"},
        {"title": t('markets.goals.nobody'), "name": "coeff_NG11_NO_GOAL"},
        {"title": "{H}", "name": "coeff_NG12_NG1"},
        {"title": "{A}", "name": "coeff_NG12_NG2"},
        {"title": t('markets.goals.nobody'), "name": "coeff_NG12_NO_GOAL"},
    ]
    },
    {
        "name": {"default": t('markets.goals.exact'), "statistics": t('markets.statistics.exact')},
        "template": "simple_list",
        "sports": ["soccer"],
        "rows": [
            {
                "title": {"default": t('markets.goals.none'), "statistics": t('markets.statistics.none')},
                "name": "coeff_FGLG_NO_GOAL"
            },
            {
                "title": {
                    "default": t('markets.goals.range', {from: 0, to: 1}),
                    "statistics": t('markets.statistics.range', {from: 0, to: 1})
                }, "name": "coeff_TG_FROM_0_TO_1_GOALS"
            },
            {
                "title": {
                    "default": t('markets.goals.range', {from: 2, to: 3}),
                    "statistics": t('markets.statistics.range', {from: 2, to: 3})
                }, "name": "coeff_TG_FROM_2_TO_3_GOALS"
            },
            {
                "title": {
                    "default": t('markets.goals.range', {from: 4, to: 6}),
                    "statistics": t('markets.statistics.range', {from: 4, to: 6})
                }, "name": "coeff_TG_FROM_4_TO_6_GOALS"
            },
            {
                "title": {"default": t('markets.goals.more'), "statistics": t('markets.statistics.more')},
                "name": "coeff_TG_FROM_7_GOALS"
            }
        ],
        "odd": "coeff_FT_",
        "id": 71,
        "group_id": 5,
        "dependencies": [
            "coeff_FGLG_NO_GOAL",
            "coeff_TG_FROM_0_TO_1_GOALS", "coeff_TG_FROM_2_TO_3_GOALS", "coeff_TG_FROM_4_TO_6_GOALS",
            "coeff_TG_FROM_7_GOALS", "coeff_FT_Even", "coeff_FT_Odd"
        ]
    },
    {
        "name": t('markets.goals.first_last'),
        "template": "simple_list",
        "sports": ["soccer", "hockey"],
        "rows": [
            {"title": t('markets.goals.none'), "name": "coeff_FGLG_NO_GOAL"},
            {"title": t('markets.goals.first', {team: '{H}'}), "name": "coeff_FGLG_FG1"},
            {"title": t('markets.goals.first', {team: '{A}'}), "name": "coeff_FGLG_FG2"},
            {"title": t('markets.goals.last', {team: '{H}'}), "name": "coeff_FGLG_LG1"},
            {"title": t('markets.goals.last', {team: '{A}'}), "name": "coeff_FGLG_LG2"}
        ],
        "id": 72,
        "group_id": 5,
        "dependencies": [
            "coeff_FGLG_NO_GOAL", "coeff_FGLG_FG1", "coeff_FGLG_FG2",
            "coeff_FGLG_LG1", "coeff_FGLG_LG2"
        ]
    },
    {
        "name": t('markets.goals.score_all_goals'),
        "template": "simple_list",
        "sports": ["soccer", "hockey", "ball_hockey", "olympic_games"],
        "rows": [
            {"name": "coeff_TG_EXACT_0_GOALS", "title": t('markets.goals.will_be_scored', {goal: 0})},
            {"name": "coeff_TG_EXACT_1_GOALS", "title": t('markets.goals.will_be_scored', {goal: 1})},
            {"name": "coeff_TG_EXACT_2_GOALS", "title": t('markets.goals.will_be_scored', {goal: 2})},
            {"name": "coeff_TG_EXACT_3_GOALS", "title": t('markets.goals.will_be_scored', {goal: 3})},
            {"name": "coeff_TG_EXACT_4_GOALS", "title": t('markets.goals.will_be_scored', {goal: 4})},
            {"name": "coeff_TG_EXACT_5_GOALS", "title": t('markets.goals.will_be_scored', {goal: 5})},
            {"name": "coeff_TG_EXACT_FROM_6_GOALS", "title": t('markets.goals.will_be_scored_more', {goal: 6})}
        ],
        "id": 73,
        "group_id": 5,
        "dependencies": [
            "coeff_TG_EXACT_0_GOALS", "coeff_TG_EXACT_1_GOALS",
            "coeff_TG_EXACT_2_GOALS", "coeff_TG_EXACT_3_GOALS", "coeff_TG_EXACT_4_GOALS", "coeff_TG_EXACT_5_GOALS",
            "coeff_TG_EXACT_FROM_6_GOALS"
        ]
    },
    {
        "name": t('markets.goals.score_goals_interval'),
        "template": "simple_list",
        "sports": ["soccer", "hockey", "ball_hockey", "olympic_games"],
        "rows": [
            {
                "name": "coeff_TG_TILL_6_FROM_0_TO_1_GOALS",
                "title": t('markets.goals.score_goals_interval_from_to', {from: 0, to: 1})
            },
            {
                "name": "coeff_TG_TILL_6_FROM_2_TO_3_GOALS",
                "title": t('markets.goals.score_goals_interval_from_to', {from: 2, to: 3})
            },
            {
                "name": "coeff_TG_TILL_6_FROM_4_TO_5_GOALS",
                "title": t('markets.goals.score_goals_interval_from_to', {from: 4, to: 5})
            },
            {
                "name": "coeff_TG_TILL_6_FROM_6_GOALS",
                "title": t('markets.goals.score_goals_interval_from', {from: 6})
            }
        ],
        "id": 74,
        "group_id": 5,
        "dependencies": [
            "coeff_TG_TILL_6_FROM_0_TO_1_GOALS",
            "coeff_TG_TILL_6_FROM_2_TO_3_GOALS", "coeff_TG_TILL_6_FROM_4_TO_5_GOALS", "coeff_TG_TILL_6_FROM_6_GOALS"
        ]
    },
    {
        "name": t('markets.goals.first_goal.title', {interval: 10}),
        "template": "simple_list",
        "sports": ["soccer", "olympic_games"],
        "rows": [
            {
                "name": "coeff_FIRST_GOAL_TIME_10_MINUTE_FROM_1_TO_10",
                "title": t('markets.goals.first_goal.interval', {from: 1, to: 10})
            },
            {
                "name": "coeff_FIRST_GOAL_TIME_10_MINUTE_FROM_11_TO_20",
                "title": t('markets.goals.first_goal.interval', {from: 11, to: 20})
            },
            {
                "name": "coeff_FIRST_GOAL_TIME_10_MINUTE_FROM_21_TO_30",
                "title": t('markets.goals.first_goal.interval', {from: 21, to: 30})
            },
            {
                "name": "coeff_FIRST_GOAL_TIME_10_MINUTE_FROM_31_TO_40",
                "title": t('markets.goals.first_goal.interval', {from: 31, to: 40})
            },
            {
                "name": "coeff_FIRST_GOAL_TIME_10_MINUTE_FROM_41_TO_50",
                "title": t('markets.goals.first_goal.interval', {from: 41, to: 50})
            },
            {
                "name": "coeff_FIRST_GOAL_TIME_10_MINUTE_FROM_51_TO_60",
                "title": t('markets.goals.first_goal.interval', {from: 51, to: 60})
            },
            {
                "name": "coeff_FIRST_GOAL_TIME_10_MINUTE_FROM_61_TO_70",
                "title": t('markets.goals.first_goal.interval', {from: 61, to: 70})
            },
            {
                "name": "coeff_FIRST_GOAL_TIME_10_MINUTE_FROM_71_TO_80",
                "title": t('markets.goals.first_goal.interval', {from: 71, to: 80})
            },
            {
                "name": "coeff_FIRST_GOAL_TIME_10_MINUTE_FROM_81_TO_90",
                "title": t('markets.goals.first_goal.interval', {from: 81, to: 90})
            },
            {"name": "coeff_FIRST_GOAL_TIME_10_MINUTE_NONE", "title": t('markets.goals.first_goal.none')}
        ],
        "id": 75,
        "group_id": 5,
        "dependencies": [
            "coeff_FIRST_GOAL_TIME_10_MINUTE_FROM_1_TO_10",
            "coeff_FIRST_GOAL_TIME_10_MINUTE_FROM_11_TO_20", "coeff_FIRST_GOAL_TIME_10_MINUTE_FROM_21_TO_30",
            "coeff_FIRST_GOAL_TIME_10_MINUTE_FROM_31_TO_40", "coeff_FIRST_GOAL_TIME_10_MINUTE_FROM_41_TO_50",
            "coeff_FIRST_GOAL_TIME_10_MINUTE_FROM_51_TO_60", "coeff_FIRST_GOAL_TIME_10_MINUTE_FROM_61_TO_70",
            "coeff_FIRST_GOAL_TIME_10_MINUTE_FROM_71_TO_80", "coeff_FIRST_GOAL_TIME_10_MINUTE_FROM_81_TO_90",
            "coeff_FIRST_GOAL_TIME_10_MINUTE_NONE"
        ]
    },
    {
        "name": t('markets.goals.first_goal.title', {interval: 15}),
        "template": "simple_list",
        "sports": ["soccer", "olympic_games"],
        "rows": [
            {
                "name": "coeff_FIRST_GOAL_TIME_15_MINUTE_FROM_1_TO_15",
                "title": t('markets.goals.first_goal.interval', {from: 1, to: 15})
            },
            {
                "name": "coeff_FIRST_GOAL_TIME_15_MINUTE_FROM_16_TO_30",
                "title": t('markets.goals.first_goal.interval', {from: 16, to: 30})
            },
            {
                "name": "coeff_FIRST_GOAL_TIME_15_MINUTE_FROM_31_TO_45",
                "title": t('markets.goals.first_goal.interval', {from: 31, to: 45})
            },
            {
                "name": "coeff_FIRST_GOAL_TIME_15_MINUTE_FROM_46_TO_60",
                "title": t('markets.goals.first_goal.interval', {from: 46, to: 60})
            },
            {
                "name": "coeff_FIRST_GOAL_TIME_15_MINUTE_FROM_61_TO_75",
                "title": t('markets.goals.first_goal.interval', {from: 61, to: 75})
            },
            {
                "name": "coeff_FIRST_GOAL_TIME_15_MINUTE_FROM_76_TO_90",
                "title": t('markets.goals.first_goal.interval', {from: 76, to: 90})
            },
            {"name": "coeff_FIRST_GOAL_TIME_15_MINUTE_NONE", "title": t('markets.goals.first_goal.none')}
        ],
        "id": 76,
        "group_id": 5,
        "dependencies": [
            "coeff_FIRST_GOAL_TIME_15_MINUTE_FROM_1_TO_15",
            "coeff_FIRST_GOAL_TIME_15_MINUTE_FROM_16_TO_30", "coeff_FIRST_GOAL_TIME_15_MINUTE_FROM_31_TO_45",
            "coeff_FIRST_GOAL_TIME_15_MINUTE_FROM_46_TO_60", "coeff_FIRST_GOAL_TIME_15_MINUTE_FROM_61_TO_75",
            "coeff_FIRST_GOAL_TIME_15_MINUTE_FROM_76_TO_90", "coeff_FIRST_GOAL_TIME_15_MINUTE_NONE"
        ]
    },
    {
        "name": t('markets.fora.time', {part: 1}), "sports": [
        "soccer"
    ], "template": "fora", "id": 78, "group_id": 2, "dependencies": [
        "coeff_ODDS_HT1_0ODDS", "coeff_ODDS_HT1_0ODDS_A", "coeff_ODDS_HT1_0ODDS_H", "coeff_ODDS_HT1_1ODDS",
        "coeff_ODDS_HT1_1ODDS_A", "coeff_ODDS_HT1_1ODDS_H", "coeff_ODDS_HT1_2ODDS", "coeff_ODDS_HT1_2ODDS_A",
        "coeff_ODDS_HT1_2ODDS_H", "coeff_ODDS_HT1_3ODDS", "coeff_ODDS_HT1_3ODDS_A", "coeff_ODDS_HT1_3ODDS_H",
        "coeff_ODDS_HT1_4ODDS", "coeff_ODDS_HT1_4ODDS_A", "coeff_ODDS_HT1_4ODDS_H", "coeff_ODDS_HT1_5ODDS",
        "coeff_ODDS_HT1_5ODDS_A", "coeff_ODDS_HT1_5ODDS_H", "coeff_ODDS_HT1_6ODDS", "coeff_ODDS_HT1_6ODDS_A",
        "coeff_ODDS_HT1_6ODDS_H", "coeff_ODDS_HT1_7ODDS", "coeff_ODDS_HT1_7ODDS_A", "coeff_ODDS_HT1_7ODDS_H",
        "coeff_ODDS_HT1_8ODDS", "coeff_ODDS_HT1_8ODDS_A", "coeff_ODDS_HT1_8ODDS_H", "coeff_ODDS_HT1_9ODDS",
        "coeff_ODDS_HT1_9ODDS_A", "coeff_ODDS_HT1_9ODDS_H"
    ], "bases": [
        "coeff_ODDS_HT1_0ODDS", "coeff_ODDS_HT1_1ODDS", "coeff_ODDS_HT1_2ODDS", "coeff_ODDS_HT1_3ODDS",
        "coeff_ODDS_HT1_4ODDS", "coeff_ODDS_HT1_5ODDS", "coeff_ODDS_HT1_6ODDS", "coeff_ODDS_HT1_7ODDS",
        "coeff_ODDS_HT1_8ODDS", "coeff_ODDS_HT1_9ODDS"
    ]
    },
    {
        "name": t('markets.fora.time', {part: 2}), "sports": [
        "soccer"
    ], "template": "fora", "id": 79, "group_id": 2, "dependencies": [
        "coeff_ODDS_HT2_0ODDS", "coeff_ODDS_HT2_0ODDS_A", "coeff_ODDS_HT2_0ODDS_H", "coeff_ODDS_HT2_1ODDS",
        "coeff_ODDS_HT2_1ODDS_A", "coeff_ODDS_HT2_1ODDS_H", "coeff_ODDS_HT2_2ODDS", "coeff_ODDS_HT2_2ODDS_A",
        "coeff_ODDS_HT2_2ODDS_H", "coeff_ODDS_HT2_3ODDS", "coeff_ODDS_HT2_3ODDS_A", "coeff_ODDS_HT2_3ODDS_H",
        "coeff_ODDS_HT2_4ODDS", "coeff_ODDS_HT2_4ODDS_A", "coeff_ODDS_HT2_4ODDS_H", "coeff_ODDS_HT2_5ODDS",
        "coeff_ODDS_HT2_5ODDS_A", "coeff_ODDS_HT2_5ODDS_H", "coeff_ODDS_HT2_6ODDS", "coeff_ODDS_HT2_6ODDS_A",
        "coeff_ODDS_HT2_6ODDS_H", "coeff_ODDS_HT2_7ODDS", "coeff_ODDS_HT2_7ODDS_A", "coeff_ODDS_HT2_7ODDS_H",
        "coeff_ODDS_HT2_8ODDS", "coeff_ODDS_HT2_8ODDS_A", "coeff_ODDS_HT2_8ODDS_H", "coeff_ODDS_HT2_9ODDS",
        "coeff_ODDS_HT2_9ODDS_A", "coeff_ODDS_HT2_9ODDS_H"
    ], "bases": [
        "coeff_ODDS_HT2_0ODDS", "coeff_ODDS_HT2_1ODDS", "coeff_ODDS_HT2_2ODDS", "coeff_ODDS_HT2_3ODDS",
        "coeff_ODDS_HT2_4ODDS", "coeff_ODDS_HT2_5ODDS", "coeff_ODDS_HT2_6ODDS", "coeff_ODDS_HT2_7ODDS",
        "coeff_ODDS_HT2_8ODDS", "coeff_ODDS_HT2_9ODDS"
    ]
    },
    {
        "name": t('markets.exact_time', {time: 1}), "sports": [
        "soccer"
    ], "template": "column_list", "time": 1, "id": 80, "group_id": 2, "dependencies": [
        "coeff_EXACT_SCORE_3_HT1_0_0", "coeff_EXACT_SCORE_3_HT1_0_1", "coeff_EXACT_SCORE_3_HT1_0_2",
        "coeff_EXACT_SCORE_3_HT1_0_3", "coeff_EXACT_SCORE_3_HT1_0_4", "coeff_EXACT_SCORE_3_HT1_1_0",
        "coeff_EXACT_SCORE_3_HT1_1_1", "coeff_EXACT_SCORE_3_HT1_1_2", "coeff_EXACT_SCORE_3_HT1_1_3",
        "coeff_EXACT_SCORE_3_HT1_1_4", "coeff_EXACT_SCORE_3_HT1_2_0", "coeff_EXACT_SCORE_3_HT1_2_1",
        "coeff_EXACT_SCORE_3_HT1_2_2", "coeff_EXACT_SCORE_3_HT1_2_3", "coeff_EXACT_SCORE_3_HT1_2_4",
        "coeff_EXACT_SCORE_3_HT1_3_0", "coeff_EXACT_SCORE_3_HT1_3_1", "coeff_EXACT_SCORE_3_HT1_3_2",
        "coeff_EXACT_SCORE_3_HT1_3_3", "coeff_EXACT_SCORE_3_HT1_3_4", "coeff_EXACT_SCORE_3_HT1_4_0",
        "coeff_EXACT_SCORE_3_HT1_4_1", "coeff_EXACT_SCORE_3_HT1_4_2", "coeff_EXACT_SCORE_3_HT1_4_3",
        "coeff_EXACT_SCORE_3_HT1_4_4", "coeff_EXACT_SCORE_3_HT1_MORE_3_GOALS"
    ], "columns": [
        {
            "title": "{H}", "rows": [
            {"title": "1-0", "name": "coeff_EXACT_SCORE_3_HT1_1_0"},
            {"title": "2-0", "name": "coeff_EXACT_SCORE_3_HT1_2_0"},
            {"title": "2-1", "name": "coeff_EXACT_SCORE_3_HT1_2_1"},
            {"title": "3-0", "name": "coeff_EXACT_SCORE_3_HT1_3_0"},
            {"title": "3-1", "name": "coeff_EXACT_SCORE_3_HT1_3_1"},
            {"title": "3-2", "name": "coeff_EXACT_SCORE_3_HT1_3_2"},
            {"title": "4-0", "name": "coeff_EXACT_SCORE_3_HT1_4_0"},
            {"title": "4-1", "name": "coeff_EXACT_SCORE_3_HT1_4_1"},
            {"title": "4-2", "name": "coeff_EXACT_SCORE_3_HT1_4_2"},
            {"title": "4-3", "name": "coeff_EXACT_SCORE_3_HT1_4_3"},
            {"title": t('markets.other_score', {goal: 3}), "name": "coeff_EXACT_SCORE_3_HT1_MORE_3_GOALS"}
        ]
        },
        {
            "title": t('markets.draw'), "rows": [
            {"title": "0-0", "name": "coeff_EXACT_SCORE_3_HT1_0_0"},
            {"title": "1-1", "name": "coeff_EXACT_SCORE_3_HT1_1_1"},
            {"title": "2-2", "name": "coeff_EXACT_SCORE_3_HT1_2_2"},
            {"title": "3-3", "name": "coeff_EXACT_SCORE_3_HT1_3_3"},
            {"title": "4-4", "name": "coeff_EXACT_SCORE_3_HT1_4_4"}
        ]
        },
        {
            "title": "{A}", "rows": [
            {"title": "0-1", "name": "coeff_EXACT_SCORE_3_HT1_0_1"},
            {"title": "0-2", "name": "coeff_EXACT_SCORE_3_HT1_0_2"},
            {"title": "0-3", "name": "coeff_EXACT_SCORE_3_HT1_0_3"},
            {"title": "0-4", "name": "coeff_EXACT_SCORE_3_HT1_0_4"},
            {"title": "1-2", "name": "coeff_EXACT_SCORE_3_HT1_1_2"},
            {"title": "1-3", "name": "coeff_EXACT_SCORE_3_HT1_1_3"},
            {"title": "1-4", "name": "coeff_EXACT_SCORE_3_HT1_1_4"},
            {"title": "2-3", "name": "coeff_EXACT_SCORE_3_HT1_2_3"},
            {"title": "2-4", "name": "coeff_EXACT_SCORE_3_HT1_2_4"},
            {"title": "3-4", "name": "coeff_EXACT_SCORE_3_HT1_3_4"}
        ]
        }
    ]
    },
    {
        "name": {
            "default": t('markets.goals.score_all_goals_time', {part: 1}),
            "hockey": t('markets.goals.score_all_goals_period', {part: 1})
        }, "template": "simple_list", "sports": ["soccer", "hockey", "ball_hockey", "olympic_games"], "rows": [
        {"name": "coeff_HT1_TG_EXACT_0_GOALS", "title": t('markets.goals.will_be_scored', {goal: 0})},
        {"name": "coeff_HT1_TG_EXACT_1_GOALS", "title": t('markets.goals.will_be_scored', {goal: 1})},
        {"name": "coeff_HT1_TG_EXACT_FROM_2_GOALS", "title": t('markets.goals.will_be_scored_more', {goal: 2})}
    ], "time": 1, "id": 81, "group_id": 2, "dependencies": [
        "coeff_HT1_TG_EXACT_0_GOALS", "coeff_HT1_TG_EXACT_1_GOALS",
        "coeff_HT1_TG_EXACT_FROM_2_GOALS"
    ]
    },
    {
        "name": t('markets.outcomes.time', {part: 1}), "template": "simple_list", "sports": [
        "soccer"
    ], "rows": [
        {"title": t('markets.home_victory'), "name": "coeff_HT1_1"},
        {"title": t('markets.win_nil', {team: '{H}'}), "name": "coeff_DCHT1_1X"},
        {"title": t('markets.draw'), "name": "coeff_HT1_X"},
        {"title": t('markets.away_victory'), "name": "coeff_HT1_2"},
        {"title": t('markets.win_nil', {team: '{A}'}), "name": "coeff_DCHT1_X2"},
        {"title": t('markets.any_victory'), "name": "coeff_DCHT1_12"}
    ], "id": 82, "group_id": 2, "dependencies": [
        "coeff_HT1_1", "coeff_DCHT1_1X", "coeff_HT1_X", "coeff_HT1_2",
        "coeff_DCHT1_X2", "coeff_DCHT1_12"
    ]
    },
    {
        "name": {
            "default": t('markets.total_time', {time: 1}),
            "statistics": t('total_statistics_time', {time: 1})
        }, "sports": [
        "soccer"
    ], "template": "total", "id": 83, "group_id": 2, "dependencies": [
        "coeff_HT1_TOTAL_0_T", "coeff_HT1_TOTAL_0_TL", "coeff_HT1_TOTAL_0_TG", "coeff_HT1_T", "coeff_HT1_TL",
        "coeff_HT1_TG", "coeff_HT1_TOTAL_1_T", "coeff_HT1_TOTAL_1_TL", "coeff_HT1_TOTAL_1_TG", "coeff_HT1_TOTAL_2_T",
        "coeff_HT1_TOTAL_2_TL", "coeff_HT1_TOTAL_2_TG", "coeff_HT1_TOTAL_3_T", "coeff_HT1_TOTAL_3_TL",
        "coeff_HT1_TOTAL_3_TG", "coeff_HT1_TOTAL_4_T", "coeff_HT1_TOTAL_4_TL", "coeff_HT1_TOTAL_4_TG",
        "coeff_HT1_TOTAL_5_T", "coeff_HT1_TOTAL_5_TL", "coeff_HT1_TOTAL_5_TG", "coeff_HT1_TOTAL_6_T",
        "coeff_HT1_TOTAL_6_TL", "coeff_HT1_TOTAL_6_TG", "coeff_HT1_TOTAL_7_T", "coeff_HT1_TOTAL_7_TL",
        "coeff_HT1_TOTAL_7_TG", "coeff_HT1_TOTAL_8_T", "coeff_HT1_TOTAL_8_TL", "coeff_HT1_TOTAL_8_TG",
        "coeff_HT1_TOTAL_9_T", "coeff_HT1_TOTAL_9_TL", "coeff_HT1_TOTAL_9_TG", "coeff_HT1_Odd", "coeff_HT1_Even"
    ], "bases": [
        "coeff_HT1_TOTAL_0_T", "coeff_HT1_T", "coeff_HT1_TOTAL_1_T", "coeff_HT1_TOTAL_2_T",
        "coeff_HT1_TOTAL_3_T", "coeff_HT1_TOTAL_4_T", "coeff_HT1_TOTAL_5_T", "coeff_HT1_TOTAL_6_T",
        "coeff_HT1_TOTAL_7_T", "coeff_HT1_TOTAL_8_T", "coeff_HT1_TOTAL_9_T"
    ], "odd": "coeff_HT1_"
    },
    {
        "name": t('markets.exact_time', {time: 2}), "sports": [
        "soccer"
    ], "template": "column_list", "time": 2, "id": 84, "group_id": 2, "dependencies": [
        "coeff_EXACT_SCORE_3_HT2_0_0", "coeff_EXACT_SCORE_3_HT2_0_1", "coeff_EXACT_SCORE_3_HT2_0_2",
        "coeff_EXACT_SCORE_3_HT2_0_3", "coeff_EXACT_SCORE_3_HT2_0_4", "coeff_EXACT_SCORE_3_HT2_1_0",
        "coeff_EXACT_SCORE_3_HT2_1_1", "coeff_EXACT_SCORE_3_HT2_1_2", "coeff_EXACT_SCORE_3_HT2_1_3",
        "coeff_EXACT_SCORE_3_HT2_1_4", "coeff_EXACT_SCORE_3_HT2_2_0", "coeff_EXACT_SCORE_3_HT2_2_1",
        "coeff_EXACT_SCORE_3_HT2_2_2", "coeff_EXACT_SCORE_3_HT2_2_3", "coeff_EXACT_SCORE_3_HT2_2_4",
        "coeff_EXACT_SCORE_3_HT2_3_0", "coeff_EXACT_SCORE_3_HT2_3_1", "coeff_EXACT_SCORE_3_HT2_3_2",
        "coeff_EXACT_SCORE_3_HT2_3_3", "coeff_EXACT_SCORE_3_HT2_3_4", "coeff_EXACT_SCORE_3_HT2_4_0",
        "coeff_EXACT_SCORE_3_HT2_4_1", "coeff_EXACT_SCORE_3_HT2_4_2", "coeff_EXACT_SCORE_3_HT2_4_3",
        "coeff_EXACT_SCORE_3_HT2_4_4", "coeff_EXACT_SCORE_3_HT2_MORE_3_GOALS"
    ], "columns": [
        {
            "title": "{H}", "rows": [
            {"title": "1-0", "name": "coeff_EXACT_SCORE_3_HT2_1_0"},
            {"title": "2-0", "name": "coeff_EXACT_SCORE_3_HT2_2_0"},
            {"title": "2-1", "name": "coeff_EXACT_SCORE_3_HT2_2_1"},
            {"title": "3-0", "name": "coeff_EXACT_SCORE_3_HT2_3_0"},
            {"title": "3-1", "name": "coeff_EXACT_SCORE_3_HT2_3_1"},
            {"title": "3-2", "name": "coeff_EXACT_SCORE_3_HT2_3_2"},
            {"title": "4-0", "name": "coeff_EXACT_SCORE_3_HT2_4_0"},
            {"title": "4-1", "name": "coeff_EXACT_SCORE_3_HT2_4_1"},
            {"title": "4-2", "name": "coeff_EXACT_SCORE_3_HT2_4_2"},
            {"title": "4-3", "name": "coeff_EXACT_SCORE_3_HT2_4_3"},
            {"title": t('markets.other_score', {goal: 3}), "name": "coeff_EXACT_SCORE_3_HT2_MORE_3_GOALS"}
        ]
        },
        {
            "title": t('markets.draw'), "rows": [
            {"title": "0-0", "name": "coeff_EXACT_SCORE_3_HT2_0_0"},
            {"title": "1-1", "name": "coeff_EXACT_SCORE_3_HT2_1_1"},
            {"title": "2-2", "name": "coeff_EXACT_SCORE_3_HT2_2_2"},
            {"title": "3-3", "name": "coeff_EXACT_SCORE_3_HT2_3_3"},
            {"title": "4-4", "name": "coeff_EXACT_SCORE_3_HT2_4_4"}
        ]
        },
        {
            "title": "{A}", "rows": [
            {"title": "0-1", "name": "coeff_EXACT_SCORE_3_HT2_0_1"},
            {"title": "0-2", "name": "coeff_EXACT_SCORE_3_HT2_0_2"},
            {"title": "0-3", "name": "coeff_EXACT_SCORE_3_HT2_0_3"},
            {"title": "0-4", "name": "coeff_EXACT_SCORE_3_HT2_0_4"},
            {"title": "1-2", "name": "coeff_EXACT_SCORE_3_HT2_1_2"},
            {"title": "1-3", "name": "coeff_EXACT_SCORE_3_HT2_1_3"},
            {"title": "1-4", "name": "coeff_EXACT_SCORE_3_HT2_1_4"},
            {"title": "2-3", "name": "coeff_EXACT_SCORE_3_HT2_2_3"},
            {"title": "2-4", "name": "coeff_EXACT_SCORE_3_HT2_2_4"},
            {"title": "3-4", "name": "coeff_EXACT_SCORE_3_HT2_3_4"}
        ]
        }
    ]
    },
    {
        "name": {
            "default": t('markets.goals.score_all_goals_time', {part: 2}),
            "hockey": t('markets.goals.score_all_goals_period', {part: 2})
        }, "template": "simple_list", "sports": ["soccer", "hockey", "ball_hockey", "olympic_games"], "rows": [
        {"name": "coeff_HT2_TG_EXACT_0_GOALS", "title": t('markets.goals.will_be_scored', {goal: 0})},
        {"name": "coeff_HT2_TG_EXACT_1_GOALS", "title": t('markets.goals.will_be_scored', {goal: 1})},
        {"name": "coeff_HT2_TG_EXACT_FROM_2_GOALS", "title": t('markets.goals.will_be_scored_more', {goal: 2})}
    ], "time": 2, "id": 85, "group_id": 2, "dependencies": [
        "coeff_HT2_TG_EXACT_0_GOALS", "coeff_HT2_TG_EXACT_1_GOALS",
        "coeff_HT2_TG_EXACT_FROM_2_GOALS"
    ]
    },
    {
        "name": t('markets.outcomes.time', {part: 2}), "sports": [
        "soccer"
    ], "template": "simple_list", "rows": [
        {"title": t('markets.home_victory'), "name": "coeff_HT2_1"},
        {"title": t('markets.win_nil', {team: '{H}'}), "name": "coeff_DCHT2_1X"},
        {"title": t('markets.draw'), "name": "coeff_HT2_X"},
        {"title": t('markets.away_victory'), "name": "coeff_HT2_2"},
        {"title": t('markets.win_nil', {team: '{A}'}), "name": "coeff_DCHT2_X2"},
        {"title": t('markets.any_victory'), "name": "coeff_DCHT2_12"}
    ], "id": 86, "group_id": 2, "dependencies": [
        "coeff_HT2_1", "coeff_DCHT2_1X", "coeff_HT2_X", "coeff_HT2_2",
        "coeff_DCHT2_X2", "coeff_DCHT2_12"
    ]
    },
    {
        "name": {
            "default": t('markets.total_time', {time: 2}),
            "statistics": t('total_statistics_time', {time: 2})
        }, "sports": [
        "soccer"
    ], "template": "total", "id": 87, "group_id": 2, "dependencies": [
        "coeff_HT2_TOTAL_0_T", "coeff_HT2_TOTAL_0_TL", "coeff_HT2_TOTAL_0_TG", "coeff_HT2_TOTAL_1_T",
        "coeff_HT2_TOTAL_1_TL", "coeff_HT2_TOTAL_1_TG", "coeff_HT2_T", "coeff_HT2_TL", "coeff_HT2_TG",
        "coeff_HT2_TOTAL_2_T", "coeff_HT2_TOTAL_2_TL", "coeff_HT2_TOTAL_2_TG", "coeff_HT2_TOTAL_3_T",
        "coeff_HT2_TOTAL_3_TL", "coeff_HT2_TOTAL_3_TG", "coeff_HT2_TOTAL_4_T", "coeff_HT2_TOTAL_4_TL",
        "coeff_HT2_TOTAL_4_TG", "coeff_HT2_TOTAL_5_T", "coeff_HT2_TOTAL_5_TL", "coeff_HT2_TOTAL_5_TG",
        "coeff_HT2_TOTAL_6_T", "coeff_HT2_TOTAL_6_TL", "coeff_HT2_TOTAL_6_TG", "coeff_HT2_TOTAL_7_T",
        "coeff_HT2_TOTAL_7_TL", "coeff_HT2_TOTAL_7_TG", "coeff_HT2_TOTAL_8_T", "coeff_HT2_TOTAL_8_TL",
        "coeff_HT2_TOTAL_8_TG", "coeff_HT2_TOTAL_9_T", "coeff_HT2_TOTAL_9_TL", "coeff_HT2_TOTAL_9_TG", "coeff_HT2_Odd",
        "coeff_HT2_Even"
    ], "bases": [
        "coeff_HT2_TOTAL_0_T", "coeff_HT2_TOTAL_1_T", "coeff_HT2_T", "coeff_HT2_TOTAL_2_T",
        "coeff_HT2_TOTAL_3_T", "coeff_HT2_TOTAL_4_T", "coeff_HT2_TOTAL_5_T", "coeff_HT2_TOTAL_6_T",
        "coeff_HT2_TOTAL_7_T", "coeff_HT2_TOTAL_8_T", "coeff_HT2_TOTAL_9_T"
    ], "odd": "coeff_HT2_"
    },
    {
        "name": t('markets.fora.time', {part: 2}), "sports": [
        "soccer"
    ], "template": "fora", "id": 88, "group_id": 2, "dependencies": [
        "coeff_ODDS_HT2_0ODDS", "coeff_ODDS_HT2_0ODDS_A", "coeff_ODDS_HT2_0ODDS_H", "coeff_ODDS_HT2_1ODDS",
        "coeff_ODDS_HT2_1ODDS_A", "coeff_ODDS_HT2_1ODDS_H", "coeff_ODDS_HT2_2ODDS", "coeff_ODDS_HT2_2ODDS_A",
        "coeff_ODDS_HT2_2ODDS_H", "coeff_ODDS_HT2_3ODDS", "coeff_ODDS_HT2_3ODDS_A", "coeff_ODDS_HT2_3ODDS_H",
        "coeff_ODDS_HT2_4ODDS", "coeff_ODDS_HT2_4ODDS_A", "coeff_ODDS_HT2_4ODDS_H", "coeff_ODDS_HT2_5ODDS",
        "coeff_ODDS_HT2_5ODDS_A", "coeff_ODDS_HT2_5ODDS_H", "coeff_ODDS_HT2_6ODDS", "coeff_ODDS_HT2_6ODDS_A",
        "coeff_ODDS_HT2_6ODDS_H", "coeff_ODDS_HT2_7ODDS", "coeff_ODDS_HT2_7ODDS_A", "coeff_ODDS_HT2_7ODDS_H",
        "coeff_ODDS_HT2_8ODDS", "coeff_ODDS_HT2_8ODDS_A", "coeff_ODDS_HT2_8ODDS_H", "coeff_ODDS_HT2_9ODDS",
        "coeff_ODDS_HT2_9ODDS_A", "coeff_ODDS_HT2_9ODDS_H"
    ], "bases": [
        "coeff_ODDS_HT2_0ODDS", "coeff_ODDS_HT2_1ODDS", "coeff_ODDS_HT2_2ODDS", "coeff_ODDS_HT2_3ODDS",
        "coeff_ODDS_HT2_4ODDS", "coeff_ODDS_HT2_5ODDS", "coeff_ODDS_HT2_6ODDS", "coeff_ODDS_HT2_7ODDS",
        "coeff_ODDS_HT2_8ODDS", "coeff_ODDS_HT2_9ODDS"
    ]
    },
    {
        "name": t('markets.goals.whos_first'),
        "sports": [
            "soccer"
        ],
        "template": "simple_list",
        "id": 89,
        "group_id": 6,
        "dependencies": ["coeff_FGLG_FG1", "coeff_FGLG_FG2", "coeff_FGLG_NO_GOAL"],
        "rows": [
            {"title": "{H}", "name": "coeff_FGLG_FG1"},
            {"title": "{A}", "name": "coeff_FGLG_FG2"},
            {"title": t('markets.goals.nobody'), "name": "coeff_FGLG_NO_GOAL"}
        ]
    },
    {
        "name": t('markets.goals.whos_last'),
        "sports": [
            "soccer"
        ],
        "template": "simple_list",
        "id": 90,
        "group_id": 6,
        "dependencies": ["coeff_FGLG_LG1", "coeff_FGLG_LG2", "coeff_FGLG_NO_GOAL"],
        "rows": [
            {"title": "{H}", "name": "coeff_FGLG_LG1"},
            {"title": "{A}", "name": "coeff_FGLG_LG2"},
            {"title": t('markets.goals.nobody'), "name": "coeff_FGLG_NO_GOAL"}
        ]
    },
    {
        "name": t('markets.outcomes.half', {part: 1}),
        "sports": [
            "basketball"
        ],
        "template": "simple_list",
        "id": 91,
        "group_id": 7,
        "dependencies": ["coeff_HT1_1", "coeff_HT1_X", "coeff_HT1_2"],
        "rows": [
            {"title": "{H}", "name": "coeff_HT1_1"},
            {"title": t('markets.draw'), "name": "coeff_HT1_X"},
            {"title": "{A}", "name": "coeff_HT1_2"}
        ]
    },
    {
        "name": t('markets.outcomes.half', {part: 2}),
        "sports": [
            "basketball"
        ],
        "template": "simple_list",
        "id": 92,
        "group_id": 7,
        "dependencies": ["coeff_HT2_1", "coeff_HT2_X", "coeff_HT2_2"],
        "rows": [
            {"title": "{H}", "name": "coeff_HT2_1"},
            {"title": t('markets.draw'), "name": "coeff_HT2_X"},
            {"title": "{A}", "name": "coeff_HT2_2"}
        ]
    },
    {
        "name": t('markets.fora.half', {part: 1}),
        "template": "fora",
        "sports": ["basketball"],
        "id": 93,
        "group_id": 7,
        "dependencies": [
            "coeff_ODDS_HT1_0ODDS", "coeff_ODDS_HT1_0ODDS_A",
            "coeff_ODDS_HT1_0ODDS_H", "coeff_ODDS_HT1_1ODDS", "coeff_ODDS_HT1_1ODDS_A", "coeff_ODDS_HT1_1ODDS_H",
            "coeff_ODDS_HT1_2ODDS", "coeff_ODDS_HT1_2ODDS_A", "coeff_ODDS_HT1_2ODDS_H", "coeff_ODDS_HT1_3ODDS",
            "coeff_ODDS_HT1_3ODDS_A", "coeff_ODDS_HT1_3ODDS_H", "coeff_ODDS_HT1_4ODDS", "coeff_ODDS_HT1_4ODDS_A",
            "coeff_ODDS_HT1_4ODDS_H", "coeff_ODDS_HT1_5ODDS", "coeff_ODDS_HT1_5ODDS_A", "coeff_ODDS_HT1_5ODDS_H",
            "coeff_ODDS_HT1_6ODDS", "coeff_ODDS_HT1_6ODDS_A", "coeff_ODDS_HT1_6ODDS_H", "coeff_ODDS_HT1_7ODDS",
            "coeff_ODDS_HT1_7ODDS_A", "coeff_ODDS_HT1_7ODDS_H", "coeff_ODDS_HT1_8ODDS", "coeff_ODDS_HT1_8ODDS_A",
            "coeff_ODDS_HT1_8ODDS_H", "coeff_ODDS_HT1_9ODDS", "coeff_ODDS_HT1_9ODDS_A", "coeff_ODDS_HT1_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HT1_0ODDS", "coeff_ODDS_HT1_1ODDS", "coeff_ODDS_HT1_2ODDS", "coeff_ODDS_HT1_3ODDS",
            "coeff_ODDS_HT1_4ODDS", "coeff_ODDS_HT1_5ODDS", "coeff_ODDS_HT1_6ODDS", "coeff_ODDS_HT1_7ODDS",
            "coeff_ODDS_HT1_8ODDS", "coeff_ODDS_HT1_9ODDS"
        ]
    },
    {
        "name": t('markets.fora.half', {part: 2}),
        "template": "fora",
        "sports": ["basketball"],
        "id": 94,
        "group_id": 7,
        "dependencies": [
            "coeff_ODDS_HT2_0ODDS", "coeff_ODDS_HT2_0ODDS_A",
            "coeff_ODDS_HT2_0ODDS_H", "coeff_ODDS_HT2_1ODDS", "coeff_ODDS_HT2_1ODDS_A", "coeff_ODDS_HT2_1ODDS_H",
            "coeff_ODDS_HT2_2ODDS", "coeff_ODDS_HT2_2ODDS_A", "coeff_ODDS_HT2_2ODDS_H", "coeff_ODDS_HT2_3ODDS",
            "coeff_ODDS_HT2_3ODDS_A", "coeff_ODDS_HT2_3ODDS_H", "coeff_ODDS_HT2_4ODDS", "coeff_ODDS_HT2_4ODDS_A",
            "coeff_ODDS_HT2_4ODDS_H", "coeff_ODDS_HT2_5ODDS", "coeff_ODDS_HT2_5ODDS_A", "coeff_ODDS_HT2_5ODDS_H",
            "coeff_ODDS_HT2_6ODDS", "coeff_ODDS_HT2_6ODDS_A", "coeff_ODDS_HT2_6ODDS_H", "coeff_ODDS_HT2_7ODDS",
            "coeff_ODDS_HT2_7ODDS_A", "coeff_ODDS_HT2_7ODDS_H", "coeff_ODDS_HT2_8ODDS", "coeff_ODDS_HT2_8ODDS_A",
            "coeff_ODDS_HT2_8ODDS_H", "coeff_ODDS_HT2_9ODDS", "coeff_ODDS_HT2_9ODDS_A", "coeff_ODDS_HT2_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HT2_0ODDS", "coeff_ODDS_HT2_1ODDS", "coeff_ODDS_HT2_2ODDS", "coeff_ODDS_HT2_3ODDS",
            "coeff_ODDS_HT2_4ODDS", "coeff_ODDS_HT2_5ODDS", "coeff_ODDS_HT2_6ODDS", "coeff_ODDS_HT2_7ODDS",
            "coeff_ODDS_HT2_8ODDS", "coeff_ODDS_HT2_9ODDS"
        ]
    },
    {
        "name": t('markets.totals.goals_half', {part: 1}), "sports": [
        "basketball"
    ], "template": "total", "id": 95, "group_id": 7, "dependencies": [
        "coeff_HT1_TOTAL_0_T", "coeff_HT1_TOTAL_0_TL", "coeff_HT1_TOTAL_0_TG", "coeff_HT1_T", "coeff_HT1_TL",
        "coeff_HT1_TG", "coeff_HT1_TOTAL_1_T", "coeff_HT1_TOTAL_1_TL", "coeff_HT1_TOTAL_1_TG", "coeff_HT1_TOTAL_2_T",
        "coeff_HT1_TOTAL_2_TL", "coeff_HT1_TOTAL_2_TG", "coeff_HT1_TOTAL_3_T", "coeff_HT1_TOTAL_3_TL",
        "coeff_HT1_TOTAL_3_TG", "coeff_HT1_TOTAL_4_T", "coeff_HT1_TOTAL_4_TL", "coeff_HT1_TOTAL_4_TG",
        "coeff_HT1_TOTAL_5_T", "coeff_HT1_TOTAL_5_TL", "coeff_HT1_TOTAL_5_TG", "coeff_HT1_TOTAL_6_T",
        "coeff_HT1_TOTAL_6_TL", "coeff_HT1_TOTAL_6_TG", "coeff_HT1_TOTAL_7_T", "coeff_HT1_TOTAL_7_TL",
        "coeff_HT1_TOTAL_7_TG", "coeff_HT1_TOTAL_8_T", "coeff_HT1_TOTAL_8_TL", "coeff_HT1_TOTAL_8_TG",
        "coeff_HT1_TOTAL_9_T", "coeff_HT1_TOTAL_9_TL", "coeff_HT1_TOTAL_9_TG", "coeff_HT1_Odd", "coeff_HT1_Even"
    ], "bases": [
        "coeff_HT1_TOTAL_0_T", "coeff_HT1_T", "coeff_HT1_TOTAL_1_T", "coeff_HT1_TOTAL_2_T",
        "coeff_HT1_TOTAL_3_T", "coeff_HT1_TOTAL_4_T", "coeff_HT1_TOTAL_5_T", "coeff_HT1_TOTAL_6_T",
        "coeff_HT1_TOTAL_7_T", "coeff_HT1_TOTAL_8_T", "coeff_HT1_TOTAL_9_T"
    ], "odd": "coeff_HT1_"
    },
    {
        "name": t('markets.totals.goals_half', {part: 2}), "sports": [
        "basketball"
    ], "template": "total", "id": 96, "group_id": 3, "dependencies": [
        "coeff_HT2_TOTAL_0_T", "coeff_HT2_TOTAL_0_TL", "coeff_HT2_TOTAL_0_TG", "coeff_HT2_TOTAL_1_T",
        "coeff_HT2_TOTAL_1_TL", "coeff_HT2_TOTAL_1_TG", "coeff_HT2_T", "coeff_HT2_TL", "coeff_HT2_TG",
        "coeff_HT2_TOTAL_2_T", "coeff_HT2_TOTAL_2_TL", "coeff_HT2_TOTAL_2_TG", "coeff_HT2_TOTAL_3_T",
        "coeff_HT2_TOTAL_3_TL", "coeff_HT2_TOTAL_3_TG", "coeff_HT2_TOTAL_4_T", "coeff_HT2_TOTAL_4_TL",
        "coeff_HT2_TOTAL_4_TG", "coeff_HT2_TOTAL_5_T", "coeff_HT2_TOTAL_5_TL", "coeff_HT2_TOTAL_5_TG",
        "coeff_HT2_TOTAL_6_T", "coeff_HT2_TOTAL_6_TL", "coeff_HT2_TOTAL_6_TG", "coeff_HT2_TOTAL_7_T",
        "coeff_HT2_TOTAL_7_TL", "coeff_HT2_TOTAL_7_TG", "coeff_HT2_TOTAL_8_T", "coeff_HT2_TOTAL_8_TL",
        "coeff_HT2_TOTAL_8_TG", "coeff_HT2_TOTAL_9_T", "coeff_HT2_TOTAL_9_TL", "coeff_HT2_TOTAL_9_TG", "coeff_HT2_Odd",
        "coeff_HT2_Even"
    ], "bases": [
        "coeff_HT2_TOTAL_0_T", "coeff_HT2_TOTAL_1_T", "coeff_HT2_T", "coeff_HT2_TOTAL_2_T",
        "coeff_HT2_TOTAL_3_T", "coeff_HT2_TOTAL_4_T", "coeff_HT2_TOTAL_5_T", "coeff_HT2_TOTAL_6_T",
        "coeff_HT2_TOTAL_7_T", "coeff_HT2_TOTAL_8_T", "coeff_HT2_TOTAL_9_T"
    ], "odd": "coeff_HT2_"
    },
    {
        "name": t('markets.totals.points_half_', {team: '{H}', part: 1}), "sports": [
        "basketball"
    ], "template": "total", "id": 97, "group_id": 7, "dependencies": [
        "coeff_HT1_HOME_TOTAL_0_T", "coeff_HT1_HOME_TOTAL_0_TL", "coeff_HT1_HOME_TOTAL_0_TG", "coeff_HT1_HOME_T",
        "coeff_HT1_HOME_TL", "coeff_HT1_HOME_TG", "coeff_HT1_HOME_TOTAL_1_T", "coeff_HT1_HOME_TOTAL_1_TL",
        "coeff_HT1_HOME_TOTAL_1_TG", "coeff_HT1_HOME_TOTAL_2_T", "coeff_HT1_HOME_TOTAL_2_TL",
        "coeff_HT1_HOME_TOTAL_2_TG", "coeff_HT1_HOME_TOTAL_3_T", "coeff_HT1_HOME_TOTAL_3_TL",
        "coeff_HT1_HOME_TOTAL_3_TG", "coeff_HT1_HOME_TOTAL_4_T", "coeff_HT1_HOME_TOTAL_4_TL",
        "coeff_HT1_HOME_TOTAL_4_TG", "coeff_HT1_HOME_TOTAL_5_T", "coeff_HT1_HOME_TOTAL_5_TL",
        "coeff_HT1_HOME_TOTAL_5_TG", "coeff_HT1_HOME_TOTAL_6_T", "coeff_HT1_HOME_TOTAL_6_TL",
        "coeff_HT1_HOME_TOTAL_6_TG", "coeff_HT1_HOME_TOTAL_7_T", "coeff_HT1_HOME_TOTAL_7_TL",
        "coeff_HT1_HOME_TOTAL_7_TG", "coeff_HT1_HOME_TOTAL_8_T", "coeff_HT1_HOME_TOTAL_8_TL",
        "coeff_HT1_HOME_TOTAL_8_TG", "coeff_HT1_HOME_TOTAL_9_T", "coeff_HT1_HOME_TOTAL_9_TL",
        "coeff_HT1_HOME_TOTAL_9_TG"
    ], "bases": [
        "coeff_HT1_HOME_TOTAL_0_T", "coeff_HT1_HOME_T", "coeff_HT1_HOME_TOTAL_1_T", "coeff_HT1_HOME_TOTAL_2_T",
        "coeff_HT1_HOME_TOTAL_3_T", "coeff_HT1_HOME_TOTAL_4_T", "coeff_HT1_HOME_TOTAL_5_T", "coeff_HT1_HOME_TOTAL_6_T",
        "coeff_HT1_HOME_TOTAL_7_T", "coeff_HT1_HOME_TOTAL_8_T", "coeff_HT1_HOME_TOTAL_9_T"
    ], "odd": []
    },
    {
        "name": t('markets.totals.points_half_', {team: '{H}', part: 2}), "sports": [
        "basketball"
    ], "template": "total", "id": 98, "group_id": 7, "dependencies": [
        "coeff_HT2_HOME_TOTAL_0_T", "coeff_HT2_HOME_TOTAL_0_TL", "coeff_HT2_HOME_TOTAL_0_TG",
        "coeff_HT2_HOME_TOTAL_1_T", "coeff_HT2_HOME_TOTAL_1_TL", "coeff_HT2_HOME_TOTAL_1_TG", "coeff_HT2_HOME_T",
        "coeff_HT2_HOME_TL", "coeff_HT2_HOME_TG", "coeff_HT2_HOME_TOTAL_2_T", "coeff_HT2_HOME_TOTAL_2_TL",
        "coeff_HT2_HOME_TOTAL_2_TG", "coeff_HT2_HOME_TOTAL_3_T", "coeff_HT2_HOME_TOTAL_3_TL",
        "coeff_HT2_HOME_TOTAL_3_TG", "coeff_HT2_HOME_TOTAL_4_T", "coeff_HT2_HOME_TOTAL_4_TL",
        "coeff_HT2_HOME_TOTAL_4_TG", "coeff_HT2_HOME_TOTAL_5_T", "coeff_HT2_HOME_TOTAL_5_TL",
        "coeff_HT2_HOME_TOTAL_5_TG", "coeff_HT2_HOME_TOTAL_6_T", "coeff_HT2_HOME_TOTAL_6_TL",
        "coeff_HT2_HOME_TOTAL_6_TG", "coeff_HT2_HOME_TOTAL_7_T", "coeff_HT2_HOME_TOTAL_7_TL",
        "coeff_HT2_HOME_TOTAL_7_TG", "coeff_HT2_HOME_TOTAL_8_T", "coeff_HT2_HOME_TOTAL_8_TL",
        "coeff_HT2_HOME_TOTAL_8_TG", "coeff_HT2_HOME_TOTAL_9_T", "coeff_HT2_HOME_TOTAL_9_TL",
        "coeff_HT2_HOME_TOTAL_9_TG"
    ], "bases": [
        "coeff_HT2_HOME_TOTAL_0_T", "coeff_HT2_HOME_TOTAL_1_T", "coeff_HT2_HOME_T", "coeff_HT2_HOME_TOTAL_2_T",
        "coeff_HT2_HOME_TOTAL_3_T", "coeff_HT2_HOME_TOTAL_4_T", "coeff_HT2_HOME_TOTAL_5_T", "coeff_HT2_HOME_TOTAL_6_T",
        "coeff_HT2_HOME_TOTAL_7_T", "coeff_HT2_HOME_TOTAL_8_T", "coeff_HT2_HOME_TOTAL_9_T"
    ], "odd": []
    },
    {
        "name": t('markets.totals.points_half_', {team: '{A}', part: 1}), "sports": [
        "basketball"
    ], "template": "total", "id": 99, "group_id": 7, "dependencies": [
        "coeff_HT1_AWAY_TOTAL_0_T", "coeff_HT1_AWAY_TOTAL_0_TL", "coeff_HT1_AWAY_TOTAL_0_TG", "coeff_HT1_AWAY_T",
        "coeff_HT1_AWAY_TL", "coeff_HT1_AWAY_TG", "coeff_HT1_AWAY_TOTAL_1_T", "coeff_HT1_AWAY_TOTAL_1_TL",
        "coeff_HT1_AWAY_TOTAL_1_TG", "coeff_HT1_AWAY_TOTAL_2_T", "coeff_HT1_AWAY_TOTAL_2_TL",
        "coeff_HT1_AWAY_TOTAL_2_TG", "coeff_HT1_AWAY_TOTAL_3_T", "coeff_HT1_AWAY_TOTAL_3_TL",
        "coeff_HT1_AWAY_TOTAL_3_TG", "coeff_HT1_AWAY_TOTAL_4_T", "coeff_HT1_AWAY_TOTAL_4_TL",
        "coeff_HT1_AWAY_TOTAL_4_TG", "coeff_HT1_AWAY_TOTAL_5_T", "coeff_HT1_AWAY_TOTAL_5_TL",
        "coeff_HT1_AWAY_TOTAL_5_TG", "coeff_HT1_AWAY_TOTAL_6_T", "coeff_HT1_AWAY_TOTAL_6_TL",
        "coeff_HT1_AWAY_TOTAL_6_TG", "coeff_HT1_AWAY_TOTAL_7_T", "coeff_HT1_AWAY_TOTAL_7_TL",
        "coeff_HT1_AWAY_TOTAL_7_TG", "coeff_HT1_AWAY_TOTAL_8_T", "coeff_HT1_AWAY_TOTAL_8_TL",
        "coeff_HT1_AWAY_TOTAL_8_TG", "coeff_HT1_AWAY_TOTAL_9_T", "coeff_HT1_AWAY_TOTAL_9_TL",
        "coeff_HT1_AWAY_TOTAL_9_TG"
    ], "bases": [
        "coeff_HT1_AWAY_TOTAL_0_T", "coeff_HT1_AWAY_T", "coeff_HT1_AWAY_TOTAL_1_T", "coeff_HT1_AWAY_TOTAL_2_T",
        "coeff_HT1_AWAY_TOTAL_3_T", "coeff_HT1_AWAY_TOTAL_4_T", "coeff_HT1_AWAY_TOTAL_5_T", "coeff_HT1_AWAY_TOTAL_6_T",
        "coeff_HT1_AWAY_TOTAL_7_T", "coeff_HT1_AWAY_TOTAL_8_T", "coeff_HT1_AWAY_TOTAL_9_T"
    ], "odd": []
    },
    {
        "name": t('markets.totals.points_half_', {team: '{A}', part: 2}), "sports": [
        "basketball"
    ], "template": "total", "id": 100, "group_id": 7, "dependencies": [
        "coeff_HT2_AWAY_TOTAL_0_T", "coeff_HT2_AWAY_TOTAL_0_TL", "coeff_HT2_AWAY_TOTAL_0_TG",
        "coeff_HT2_AWAY_TOTAL_1_T", "coeff_HT2_AWAY_TOTAL_1_TL", "coeff_HT2_AWAY_TOTAL_1_TG", "coeff_HT2_AWAY_T",
        "coeff_HT2_AWAY_TL", "coeff_HT2_AWAY_TG", "coeff_HT2_AWAY_TOTAL_2_T", "coeff_HT2_AWAY_TOTAL_2_TL",
        "coeff_HT2_AWAY_TOTAL_2_TG", "coeff_HT2_AWAY_TOTAL_3_T", "coeff_HT2_AWAY_TOTAL_3_TL",
        "coeff_HT2_AWAY_TOTAL_3_TG", "coeff_HT2_AWAY_TOTAL_4_T", "coeff_HT2_AWAY_TOTAL_4_TL",
        "coeff_HT2_AWAY_TOTAL_4_TG", "coeff_HT2_AWAY_TOTAL_5_T", "coeff_HT2_AWAY_TOTAL_5_TL",
        "coeff_HT2_AWAY_TOTAL_5_TG", "coeff_HT2_AWAY_TOTAL_6_T", "coeff_HT2_AWAY_TOTAL_6_TL",
        "coeff_HT2_AWAY_TOTAL_6_TG", "coeff_HT2_AWAY_TOTAL_7_T", "coeff_HT2_AWAY_TOTAL_7_TL",
        "coeff_HT2_AWAY_TOTAL_7_TG", "coeff_HT2_AWAY_TOTAL_8_T", "coeff_HT2_AWAY_TOTAL_8_TL",
        "coeff_HT2_AWAY_TOTAL_8_TG", "coeff_HT2_AWAY_TOTAL_9_T", "coeff_HT2_AWAY_TOTAL_9_TL",
        "coeff_HT2_AWAY_TOTAL_9_TG"
    ], "bases": [
        "coeff_HT2_AWAY_TOTAL_0_T", "coeff_HT2_AWAY_TOTAL_1_T", "coeff_HT2_AWAY_T",
        "coeff_HT2_AWAY_TOTAL_2_T", "coeff_HT2_AWAY_TOTAL_3_T", "coeff_HT2_AWAY_TOTAL_4_T", "coeff_HT2_AWAY_TOTAL_5_T",
        "coeff_HT2_AWAY_TOTAL_6_T", "coeff_HT2_AWAY_TOTAL_7_T", "coeff_HT2_AWAY_TOTAL_8_T", "coeff_HT2_AWAY_TOTAL_9_T"
    ], "odd": []
    },
    {
        "name": t('markets.outcomes.quarter', {part: 1}),
        "template": "simple_list",
        "sports": ["basketball"],
        "rows": [
            {"title": t('markets.home_victory'), "name": "coeff_HTQ1_1"},
            {"title": t('markets.win_nil', {team: '{H}'}), "name": "coeff_DCHTQ1_1X"},
            {"title": t('markets.draw'), "name": "coeff_HTQ1_X"},
            {"title": t('markets.away_victory'), "name": "coeff_HTQ1_2"},
            {"title": t('markets.win_nil', {team: '{A}'}), "name": "coeff_DCHTQ1_X2"},
            {"title": t('markets.any_victory'), "name": "coeff_DCHTQ1_12"}
        ],
        "id": 101,
        "group_id": 8,
        "dependencies": [
            "coeff_HTQ1_1", "coeff_DCHTQ1_1X", "coeff_HTQ1_X", "coeff_HTQ1_2",
            "coeff_DCHTQ1_X2", "coeff_DCHTQ1_12"
        ]
    },
    {
        "name": t('markets.outcomes.quarter', {part: 2}),
        "template": "simple_list",
        "sports": ["basketball"],
        "rows": [
            {"title": t('markets.home_victory'), "name": "coeff_HTQ2_1"},
            {"title": t('markets.win_nil', {team: '{H}'}), "name": "coeff_DCHTQ2_1X"},
            {"title": t('markets.draw'), "name": "coeff_HTQ2_X"},
            {"title": t('markets.away_victory'), "name": "coeff_HTQ2_2"},
            {"title": t('markets.win_nil', {team: '{A}'}), "name": "coeff_DCHTQ2_X2"},
            {"title": t('markets.any_victory'), "name": "coeff_DCHTQ2_12"}
        ],
        "id": 102,
        "group_id": 8,
        "dependencies": [
            "coeff_HTQ2_1", "coeff_DCHTQ2_1X", "coeff_HTQ2_X", "coeff_HTQ2_2",
            "coeff_DCHTQ2_X2", "coeff_DCHTQ2_12"
        ]
    },
    {
        "name": t('markets.outcomes.quarter', {part: 3}),
        "template": "simple_list",
        "sports": ["basketball"],
        "rows": [
            {"title": t('markets.home_victory'), "name": "coeff_HTQ3_1"},
            {"title": t('markets.win_nil', {team: '{H}'}), "name": "coeff_DCHTQ3_1X"},
            {"title": t('markets.draw'), "name": "coeff_HTQ3_X"},
            {"title": t('markets.away_victory'), "name": "coeff_HTQ3_2"},
            {"title": t('markets.win_nil', {team: '{A}'}), "name": "coeff_DCHTQ3_X2"},
            {"title": t('markets.any_victory'), "name": "coeff_DCHTQ3_12"}
        ],
        "id": 103,
        "group_id": 8,
        "dependencies": [
            "coeff_HTQ3_1", "coeff_DCHTQ3_1X", "coeff_HTQ3_X", "coeff_HTQ3_2",
            "coeff_DCHTQ3_X2", "coeff_DCHTQ3_12"
        ]
    },
    {
        "name": t('markets.outcomes.quarter', {part: 4}),
        "template": "simple_list",
        "sports": ["basketball"],
        "rows": [
            {"title": t('markets.home_victory'), "name": "coeff_HTQ4_1"},
            {"title": t('markets.win_nil', {team: '{H}'}), "name": "coeff_DCHTQ4_1X"},
            {"title": t('markets.draw'), "name": "coeff_HTQ4_X"},
            {"title": t('markets.away_victory'), "name": "coeff_HTQ4_2"},
            {"title": t('markets.win_nil', {team: '{A}'}), "name": "coeff_DCHTQ4_X2"},
            {"title": t('markets.any_victory'), "name": "coeff_DCHTQ4_12"}
        ],
        "id": 104,
        "group_id": 8,
        "dependencies": [
            "coeff_HTQ4_1", "coeff_DCHTQ4_1X", "coeff_HTQ4_X", "coeff_HTQ4_2",
            "coeff_DCHTQ4_X2", "coeff_DCHTQ4_12"
        ]
    },
    {
        "name": t('markets.fora.quarter', {part: 1}),
        "template": "fora",
        "sports": ["basketball"],
        "id": 105,
        "group_id": 8,
        "dependencies": [
            "coeff_ODDS_HTQ1_0ODDS", "coeff_ODDS_HTQ1_0ODDS_A",
            "coeff_ODDS_HTQ1_0ODDS_H", "coeff_ODDS_HTQ1_1ODDS", "coeff_ODDS_HTQ1_1ODDS_A", "coeff_ODDS_HTQ1_1ODDS_H",
            "coeff_ODDS_HTQ1_2ODDS", "coeff_ODDS_HTQ1_2ODDS_A", "coeff_ODDS_HTQ1_2ODDS_H", "coeff_ODDS_HTQ1_3ODDS",
            "coeff_ODDS_HTQ1_3ODDS_A", "coeff_ODDS_HTQ1_3ODDS_H", "coeff_ODDS_HTQ1_4ODDS", "coeff_ODDS_HTQ1_4ODDS_A",
            "coeff_ODDS_HTQ1_4ODDS_H", "coeff_ODDS_HTQ1_5ODDS", "coeff_ODDS_HTQ1_5ODDS_A", "coeff_ODDS_HTQ1_5ODDS_H",
            "coeff_ODDS_HTQ1_6ODDS", "coeff_ODDS_HTQ1_6ODDS_A", "coeff_ODDS_HTQ1_6ODDS_H", "coeff_ODDS_HTQ1_7ODDS",
            "coeff_ODDS_HTQ1_7ODDS_A", "coeff_ODDS_HTQ1_7ODDS_H", "coeff_ODDS_HTQ1_8ODDS", "coeff_ODDS_HTQ1_8ODDS_A",
            "coeff_ODDS_HTQ1_8ODDS_H", "coeff_ODDS_HTQ1_9ODDS", "coeff_ODDS_HTQ1_9ODDS_A", "coeff_ODDS_HTQ1_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HTQ1_0ODDS", "coeff_ODDS_HTQ1_1ODDS", "coeff_ODDS_HTQ1_2ODDS", "coeff_ODDS_HTQ1_3ODDS",
            "coeff_ODDS_HTQ1_4ODDS", "coeff_ODDS_HTQ1_5ODDS", "coeff_ODDS_HTQ1_6ODDS", "coeff_ODDS_HTQ1_7ODDS",
            "coeff_ODDS_HTQ1_8ODDS", "coeff_ODDS_HTQ1_9ODDS"
        ]
    },
    {
        "name": t('markets.fora.quarter', {part: 2}),
        "template": "fora",
        "sports": ["basketball"],
        "id": 106,
        "group_id": 8,
        "dependencies": [
            "coeff_ODDS_HTQ2_0ODDS", "coeff_ODDS_HTQ2_0ODDS_A",
            "coeff_ODDS_HTQ2_0ODDS_H", "coeff_ODDS_HTQ2_1ODDS", "coeff_ODDS_HTQ2_1ODDS_A", "coeff_ODDS_HTQ2_1ODDS_H",
            "coeff_ODDS_HTQ2_2ODDS", "coeff_ODDS_HTQ2_2ODDS_A", "coeff_ODDS_HTQ2_2ODDS_H", "coeff_ODDS_HTQ2_3ODDS",
            "coeff_ODDS_HTQ2_3ODDS_A", "coeff_ODDS_HTQ2_3ODDS_H", "coeff_ODDS_HTQ2_4ODDS", "coeff_ODDS_HTQ2_4ODDS_A",
            "coeff_ODDS_HTQ2_4ODDS_H", "coeff_ODDS_HTQ2_5ODDS", "coeff_ODDS_HTQ2_5ODDS_A", "coeff_ODDS_HTQ2_5ODDS_H",
            "coeff_ODDS_HTQ2_6ODDS", "coeff_ODDS_HTQ2_6ODDS_A", "coeff_ODDS_HTQ2_6ODDS_H", "coeff_ODDS_HTQ2_7ODDS",
            "coeff_ODDS_HTQ2_7ODDS_A", "coeff_ODDS_HTQ2_7ODDS_H", "coeff_ODDS_HTQ2_8ODDS", "coeff_ODDS_HTQ2_8ODDS_A",
            "coeff_ODDS_HTQ2_8ODDS_H", "coeff_ODDS_HTQ2_9ODDS", "coeff_ODDS_HTQ2_9ODDS_A", "coeff_ODDS_HTQ2_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HTQ2_0ODDS", "coeff_ODDS_HTQ2_1ODDS", "coeff_ODDS_HTQ2_2ODDS", "coeff_ODDS_HTQ2_3ODDS",
            "coeff_ODDS_HTQ2_4ODDS", "coeff_ODDS_HTQ2_5ODDS", "coeff_ODDS_HTQ2_6ODDS", "coeff_ODDS_HTQ2_7ODDS",
            "coeff_ODDS_HTQ2_8ODDS", "coeff_ODDS_HTQ2_9ODDS"
        ]
    },
    {
        "name": t('markets.fora.quarter', {part: 3}),
        "template": "fora",
        "sports": ["basketball"],
        "id": 107,
        "group_id": 8,
        "dependencies": [
            "coeff_ODDS_HTQ3_0ODDS", "coeff_ODDS_HTQ3_0ODDS_A",
            "coeff_ODDS_HTQ3_0ODDS_H", "coeff_ODDS_HTQ3_1ODDS", "coeff_ODDS_HTQ3_1ODDS_A", "coeff_ODDS_HTQ3_1ODDS_H",
            "coeff_ODDS_HTQ3_2ODDS", "coeff_ODDS_HTQ3_2ODDS_A", "coeff_ODDS_HTQ3_2ODDS_H", "coeff_ODDS_HTQ3_3ODDS",
            "coeff_ODDS_HTQ3_3ODDS_A", "coeff_ODDS_HTQ3_3ODDS_H", "coeff_ODDS_HTQ3_4ODDS", "coeff_ODDS_HTQ3_4ODDS_A",
            "coeff_ODDS_HTQ3_4ODDS_H", "coeff_ODDS_HTQ3_5ODDS", "coeff_ODDS_HTQ3_5ODDS_A", "coeff_ODDS_HTQ3_5ODDS_H",
            "coeff_ODDS_HTQ3_6ODDS", "coeff_ODDS_HTQ3_6ODDS_A", "coeff_ODDS_HTQ3_6ODDS_H", "coeff_ODDS_HTQ3_7ODDS",
            "coeff_ODDS_HTQ3_7ODDS_A", "coeff_ODDS_HTQ3_7ODDS_H", "coeff_ODDS_HTQ3_8ODDS", "coeff_ODDS_HTQ3_8ODDS_A",
            "coeff_ODDS_HTQ3_8ODDS_H", "coeff_ODDS_HTQ3_9ODDS", "coeff_ODDS_HTQ3_9ODDS_A", "coeff_ODDS_HTQ3_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HTQ3_0ODDS", "coeff_ODDS_HTQ3_1ODDS", "coeff_ODDS_HTQ3_2ODDS", "coeff_ODDS_HTQ3_3ODDS",
            "coeff_ODDS_HTQ3_4ODDS", "coeff_ODDS_HTQ3_5ODDS", "coeff_ODDS_HTQ3_6ODDS", "coeff_ODDS_HTQ3_7ODDS",
            "coeff_ODDS_HTQ3_8ODDS", "coeff_ODDS_HTQ3_9ODDS"
        ]
    },
    {
        "name": t('markets.fora.quarter', {part: 4}),
        "template": "fora",
        "sports": ["basketball"],
        "id": 108,
        "group_id": 8,
        "dependencies": [
            "coeff_ODDS_HTQ4_0ODDS", "coeff_ODDS_HTQ4_0ODDS_A",
            "coeff_ODDS_HTQ4_0ODDS_H", "coeff_ODDS_HTQ4_1ODDS", "coeff_ODDS_HTQ4_1ODDS_A", "coeff_ODDS_HTQ4_1ODDS_H",
            "coeff_ODDS_HTQ4_2ODDS", "coeff_ODDS_HTQ4_2ODDS_A", "coeff_ODDS_HTQ4_2ODDS_H", "coeff_ODDS_HTQ4_3ODDS",
            "coeff_ODDS_HTQ4_3ODDS_A", "coeff_ODDS_HTQ4_3ODDS_H", "coeff_ODDS_HTQ4_4ODDS", "coeff_ODDS_HTQ4_4ODDS_A",
            "coeff_ODDS_HTQ4_4ODDS_H", "coeff_ODDS_HTQ4_5ODDS", "coeff_ODDS_HTQ4_5ODDS_A", "coeff_ODDS_HTQ4_5ODDS_H",
            "coeff_ODDS_HTQ4_6ODDS", "coeff_ODDS_HTQ4_6ODDS_A", "coeff_ODDS_HTQ4_6ODDS_H", "coeff_ODDS_HTQ4_7ODDS",
            "coeff_ODDS_HTQ4_7ODDS_A", "coeff_ODDS_HTQ4_7ODDS_H", "coeff_ODDS_HTQ4_8ODDS", "coeff_ODDS_HTQ4_8ODDS_A",
            "coeff_ODDS_HTQ4_8ODDS_H", "coeff_ODDS_HTQ4_9ODDS", "coeff_ODDS_HTQ4_9ODDS_A", "coeff_ODDS_HTQ4_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HTQ4_0ODDS", "coeff_ODDS_HTQ4_1ODDS", "coeff_ODDS_HTQ4_2ODDS", "coeff_ODDS_HTQ4_3ODDS",
            "coeff_ODDS_HTQ4_4ODDS", "coeff_ODDS_HTQ4_5ODDS", "coeff_ODDS_HTQ4_6ODDS", "coeff_ODDS_HTQ4_7ODDS",
            "coeff_ODDS_HTQ4_8ODDS", "coeff_ODDS_HTQ4_9ODDS"
        ]
    },
    {
        "name": t('markets.totals.points_quarter', {part: 1}), "sports": [
        "basketball"
    ], "template": "total", "id": 109, "group_id": 8, "dependencies": [
        "coeff_HTQ1_TOTAL_0_T", "coeff_HTQ1_TOTAL_0_TL", "coeff_HTQ1_TOTAL_0_TG", "coeff_HTQ1_T", "coeff_HTQ1_TL",
        "coeff_HTQ1_TG", "coeff_HTQ1_TOTAL_1_T", "coeff_HTQ1_TOTAL_1_TL", "coeff_HTQ1_TOTAL_1_TG",
        "coeff_HTQ1_TOTAL_2_T", "coeff_HTQ1_TOTAL_2_TL", "coeff_HTQ1_TOTAL_2_TG", "coeff_HTQ1_TOTAL_3_T",
        "coeff_HTQ1_TOTAL_3_TL", "coeff_HTQ1_TOTAL_3_TG", "coeff_HTQ1_TOTAL_4_T", "coeff_HTQ1_TOTAL_4_TL",
        "coeff_HTQ1_TOTAL_4_TG", "coeff_HTQ1_TOTAL_5_T", "coeff_HTQ1_TOTAL_5_TL", "coeff_HTQ1_TOTAL_5_TG",
        "coeff_HTQ1_TOTAL_6_T", "coeff_HTQ1_TOTAL_6_TL", "coeff_HTQ1_TOTAL_6_TG", "coeff_HTQ1_TOTAL_7_T",
        "coeff_HTQ1_TOTAL_7_TL", "coeff_HTQ1_TOTAL_7_TG", "coeff_HTQ1_TOTAL_8_T", "coeff_HTQ1_TOTAL_8_TL",
        "coeff_HTQ1_TOTAL_8_TG", "coeff_HTQ1_TOTAL_9_T", "coeff_HTQ1_TOTAL_9_TL", "coeff_HTQ1_TOTAL_9_TG",
        "coeff_HTQ1_Odd", "coeff_HTQ1_Even"
    ], "bases": [
        "coeff_HTQ1_TOTAL_0_T", "coeff_HTQ1_T", "coeff_HTQ1_TOTAL_1_T", "coeff_HTQ1_TOTAL_2_T",
        "coeff_HTQ1_TOTAL_3_T", "coeff_HTQ1_TOTAL_4_T", "coeff_HTQ1_TOTAL_5_T", "coeff_HTQ1_TOTAL_6_T",
        "coeff_HTQ1_TOTAL_7_T", "coeff_HTQ1_TOTAL_8_T", "coeff_HTQ1_TOTAL_9_T"
    ], "odd": "coeff_HTQ1_"
    },
    {
        "name": t('markets.totals.points_quarter', {part: 2}), "sports": [
        "basketball"
    ], "template": "total", "id": 110, "group_id": 8, "dependencies": [
        "coeff_HTQ2_TOTAL_0_T", "coeff_HTQ2_TOTAL_0_TL", "coeff_HTQ2_TOTAL_0_TG", "coeff_HTQ2_TOTAL_1_T",
        "coeff_HTQ2_TOTAL_1_TL", "coeff_HTQ2_TOTAL_1_TG", "coeff_HTQ2_T", "coeff_HTQ2_TL", "coeff_HTQ2_TG",
        "coeff_HTQ2_TOTAL_2_T", "coeff_HTQ2_TOTAL_2_TL", "coeff_HTQ2_TOTAL_2_TG", "coeff_HTQ2_TOTAL_3_T",
        "coeff_HTQ2_TOTAL_3_TL", "coeff_HTQ2_TOTAL_3_TG", "coeff_HTQ2_TOTAL_4_T", "coeff_HTQ2_TOTAL_4_TL",
        "coeff_HTQ2_TOTAL_4_TG", "coeff_HTQ2_TOTAL_5_T", "coeff_HTQ2_TOTAL_5_TL", "coeff_HTQ2_TOTAL_5_TG",
        "coeff_HTQ2_TOTAL_6_T", "coeff_HTQ2_TOTAL_6_TL", "coeff_HTQ2_TOTAL_6_TG", "coeff_HTQ2_TOTAL_7_T",
        "coeff_HTQ2_TOTAL_7_TL", "coeff_HTQ2_TOTAL_7_TG", "coeff_HTQ2_TOTAL_8_T", "coeff_HTQ2_TOTAL_8_TL",
        "coeff_HTQ2_TOTAL_8_TG", "coeff_HTQ2_TOTAL_9_T", "coeff_HTQ2_TOTAL_9_TL", "coeff_HTQ2_TOTAL_9_TG",
        "coeff_HTQ2_Odd", "coeff_HTQ2_Even"
    ], "bases": [
        "coeff_HTQ2_TOTAL_0_T", "coeff_HTQ2_TOTAL_1_T", "coeff_HTQ2_T", "coeff_HTQ2_TOTAL_2_T",
        "coeff_HTQ2_TOTAL_3_T", "coeff_HTQ2_TOTAL_4_T", "coeff_HTQ2_TOTAL_5_T", "coeff_HTQ2_TOTAL_6_T",
        "coeff_HTQ2_TOTAL_7_T", "coeff_HTQ2_TOTAL_8_T", "coeff_HTQ2_TOTAL_9_T"
    ], "odd": "coeff_HTQ2_"
    },
    {
        "name": t('markets.totals.points_quarter', {part: 3}), "sports": [
        "basketball"
    ], "template": "total", "id": 111, "group_id": 8, "dependencies": [
        "coeff_HTQ3_TOTAL_0_T", "coeff_HTQ3_TOTAL_0_TL", "coeff_HTQ3_TOTAL_0_TG", "coeff_HTQ3_TOTAL_1_T",
        "coeff_HTQ3_TOTAL_1_TL", "coeff_HTQ3_TOTAL_1_TG", "coeff_HTQ3_TOTAL_2_T", "coeff_HTQ3_TOTAL_2_TL",
        "coeff_HTQ3_TOTAL_2_TG", "coeff_HTQ3_T", "coeff_HTQ3_TL", "coeff_HTQ3_TG", "coeff_HTQ3_TOTAL_3_T",
        "coeff_HTQ3_TOTAL_3_TL", "coeff_HTQ3_TOTAL_3_TG", "coeff_HTQ3_TOTAL_4_T", "coeff_HTQ3_TOTAL_4_TL",
        "coeff_HTQ3_TOTAL_4_TG", "coeff_HTQ3_TOTAL_5_T", "coeff_HTQ3_TOTAL_5_TL", "coeff_HTQ3_TOTAL_5_TG",
        "coeff_HTQ3_TOTAL_6_T", "coeff_HTQ3_TOTAL_6_TL", "coeff_HTQ3_TOTAL_6_TG", "coeff_HTQ3_TOTAL_7_T",
        "coeff_HTQ3_TOTAL_7_TL", "coeff_HTQ3_TOTAL_7_TG", "coeff_HTQ3_TOTAL_8_T", "coeff_HTQ3_TOTAL_8_TL",
        "coeff_HTQ3_TOTAL_8_TG", "coeff_HTQ3_TOTAL_9_T", "coeff_HTQ3_TOTAL_9_TL", "coeff_HTQ3_TOTAL_9_TG",
        "coeff_HTQ3_Odd", "coeff_HTQ3_Even"
    ], "bases": [
        "coeff_HTQ3_TOTAL_0_T", "coeff_HTQ3_TOTAL_1_T", "coeff_HTQ3_TOTAL_2_T", "coeff_HTQ3_T",
        "coeff_HTQ3_TOTAL_3_T", "coeff_HTQ3_TOTAL_4_T", "coeff_HTQ3_TOTAL_5_T", "coeff_HTQ3_TOTAL_6_T",
        "coeff_HTQ3_TOTAL_7_T", "coeff_HTQ3_TOTAL_8_T", "coeff_HTQ3_TOTAL_9_T"
    ], "odd": "coeff_HTQ3_"
    },
    {
        "name": t('markets.totals.points_quarter', {part: 4}), "sports": [
        "basketball"
    ], "template": "total", "id": 112, "group_id": 8, "dependencies": [
        "coeff_HTQ4_TOTAL_0_T", "coeff_HTQ4_TOTAL_0_TL", "coeff_HTQ4_TOTAL_0_TG", "coeff_HTQ4_TOTAL_1_T",
        "coeff_HTQ4_TOTAL_1_TL", "coeff_HTQ4_TOTAL_1_TG", "coeff_HTQ4_TOTAL_2_T", "coeff_HTQ4_TOTAL_2_TL",
        "coeff_HTQ4_TOTAL_2_TG", "coeff_HTQ4_TOTAL_3_T", "coeff_HTQ4_TOTAL_3_TL", "coeff_HTQ4_TOTAL_3_TG",
        "coeff_HTQ4_T", "coeff_HTQ4_TL", "coeff_HTQ4_TG", "coeff_HTQ4_TOTAL_4_T", "coeff_HTQ4_TOTAL_4_TL",
        "coeff_HTQ4_TOTAL_4_TG", "coeff_HTQ4_TOTAL_5_T", "coeff_HTQ4_TOTAL_5_TL", "coeff_HTQ4_TOTAL_5_TG",
        "coeff_HTQ4_TOTAL_6_T", "coeff_HTQ4_TOTAL_6_TL", "coeff_HTQ4_TOTAL_6_TG", "coeff_HTQ4_TOTAL_7_T",
        "coeff_HTQ4_TOTAL_7_TL", "coeff_HTQ4_TOTAL_7_TG", "coeff_HTQ4_TOTAL_8_T", "coeff_HTQ4_TOTAL_8_TL",
        "coeff_HTQ4_TOTAL_8_TG", "coeff_HTQ4_TOTAL_9_T", "coeff_HTQ4_TOTAL_9_TL", "coeff_HTQ4_TOTAL_9_TG",
        "coeff_HTQ4_Odd", "coeff_HTQ4_Even"
    ], "bases": [
        "coeff_HTQ4_TOTAL_0_T", "coeff_HTQ4_TOTAL_1_T", "coeff_HTQ4_TOTAL_2_T", "coeff_HTQ4_TOTAL_3_T",
        "coeff_HTQ4_T", "coeff_HTQ4_TOTAL_4_T", "coeff_HTQ4_TOTAL_5_T", "coeff_HTQ4_TOTAL_6_T", "coeff_HTQ4_TOTAL_7_T",
        "coeff_HTQ4_TOTAL_8_T", "coeff_HTQ4_TOTAL_9_T"
    ], "odd": "coeff_HTQ4_"
    },
    {
        "name": t('markets.totals.points_quarter', {part: 5}), "sports": [
        "basketball"
    ], "template": "total", "id": 113, "group_id": 8, "dependencies": [
        "coeff_HTQ5_TOTAL_0_T", "coeff_HTQ5_TOTAL_0_TL", "coeff_HTQ5_TOTAL_0_TG", "coeff_HTQ5_TOTAL_1_T",
        "coeff_HTQ5_TOTAL_1_TL", "coeff_HTQ5_TOTAL_1_TG", "coeff_HTQ5_TOTAL_2_T", "coeff_HTQ5_TOTAL_2_TL",
        "coeff_HTQ5_TOTAL_2_TG", "coeff_HTQ5_TOTAL_3_T", "coeff_HTQ5_TOTAL_3_TL", "coeff_HTQ5_TOTAL_3_TG",
        "coeff_HTQ5_TOTAL_4_T", "coeff_HTQ5_TOTAL_4_TL", "coeff_HTQ5_TOTAL_4_TG", "coeff_HTQ5_T", "coeff_HTQ5_TL",
        "coeff_HTQ5_TG", "coeff_HTQ5_TOTAL_5_T", "coeff_HTQ5_TOTAL_5_TL", "coeff_HTQ5_TOTAL_5_TG",
        "coeff_HTQ5_TOTAL_6_T", "coeff_HTQ5_TOTAL_6_TL", "coeff_HTQ5_TOTAL_6_TG", "coeff_HTQ5_TOTAL_7_T",
        "coeff_HTQ5_TOTAL_7_TL", "coeff_HTQ5_TOTAL_7_TG", "coeff_HTQ5_TOTAL_8_T", "coeff_HTQ5_TOTAL_8_TL",
        "coeff_HTQ5_TOTAL_8_TG", "coeff_HTQ5_TOTAL_9_T", "coeff_HTQ5_TOTAL_9_TL", "coeff_HTQ5_TOTAL_9_TG",
        "coeff_HTQ5_Odd", "coeff_HTQ5_Even"
    ], "bases": [
        "coeff_HTQ5_TOTAL_0_T", "coeff_HTQ5_TOTAL_1_T", "coeff_HTQ5_TOTAL_2_T", "coeff_HTQ5_TOTAL_3_T",
        "coeff_HTQ5_TOTAL_4_T", "coeff_HTQ5_T", "coeff_HTQ5_TOTAL_5_T", "coeff_HTQ5_TOTAL_6_T", "coeff_HTQ5_TOTAL_7_T",
        "coeff_HTQ5_TOTAL_8_T", "coeff_HTQ5_TOTAL_9_T"
    ], "odd": "coeff_HTQ5_"
    },
    {
        "name": t('markets.totals.points_quarter', {part: 6}), "sports": [
        "basketball"
    ], "template": "total", "id": 114, "group_id": 8, "dependencies": [
        "coeff_HTQ6_TOTAL_0_T", "coeff_HTQ6_TOTAL_0_TL", "coeff_HTQ6_TOTAL_0_TG", "coeff_HTQ6_TOTAL_1_T",
        "coeff_HTQ6_TOTAL_1_TL", "coeff_HTQ6_TOTAL_1_TG", "coeff_HTQ6_TOTAL_2_T", "coeff_HTQ6_TOTAL_2_TL",
        "coeff_HTQ6_TOTAL_2_TG", "coeff_HTQ6_TOTAL_3_T", "coeff_HTQ6_TOTAL_3_TL", "coeff_HTQ6_TOTAL_3_TG",
        "coeff_HTQ6_TOTAL_4_T", "coeff_HTQ6_TOTAL_4_TL", "coeff_HTQ6_TOTAL_4_TG", "coeff_HTQ6_TOTAL_5_T",
        "coeff_HTQ6_TOTAL_5_TL", "coeff_HTQ6_TOTAL_5_TG", "coeff_HTQ6_T", "coeff_HTQ6_TL", "coeff_HTQ6_TG",
        "coeff_HTQ6_TOTAL_6_T", "coeff_HTQ6_TOTAL_6_TL", "coeff_HTQ6_TOTAL_6_TG", "coeff_HTQ6_TOTAL_7_T",
        "coeff_HTQ6_TOTAL_7_TL", "coeff_HTQ6_TOTAL_7_TG", "coeff_HTQ6_TOTAL_8_T", "coeff_HTQ6_TOTAL_8_TL",
        "coeff_HTQ6_TOTAL_8_TG", "coeff_HTQ6_TOTAL_9_T", "coeff_HTQ6_TOTAL_9_TL", "coeff_HTQ6_TOTAL_9_TG",
        "coeff_HTQ6_Odd", "coeff_HTQ6_Even"
    ], "bases": [
        "coeff_HTQ6_TOTAL_0_T", "coeff_HTQ6_TOTAL_1_T", "coeff_HTQ6_TOTAL_2_T", "coeff_HTQ6_TOTAL_3_T",
        "coeff_HTQ6_TOTAL_4_T", "coeff_HTQ6_TOTAL_5_T", "coeff_HTQ6_T", "coeff_HTQ6_TOTAL_6_T", "coeff_HTQ6_TOTAL_7_T",
        "coeff_HTQ6_TOTAL_8_T", "coeff_HTQ6_TOTAL_9_T"
    ], "odd": "coeff_HTQ6_"
    },
    {
        "name": t('markets.totals.points_quarter', {part: 7}), "sports": [
        "basketball"
    ], "template": "total", "id": 115, "group_id": 8, "dependencies": [
        "coeff_HTQ7_TOTAL_0_T", "coeff_HTQ7_TOTAL_0_TL", "coeff_HTQ7_TOTAL_0_TG", "coeff_HTQ7_TOTAL_1_T",
        "coeff_HTQ7_TOTAL_1_TL", "coeff_HTQ7_TOTAL_1_TG", "coeff_HTQ7_TOTAL_2_T", "coeff_HTQ7_TOTAL_2_TL",
        "coeff_HTQ7_TOTAL_2_TG", "coeff_HTQ7_TOTAL_3_T", "coeff_HTQ7_TOTAL_3_TL", "coeff_HTQ7_TOTAL_3_TG",
        "coeff_HTQ7_TOTAL_4_T", "coeff_HTQ7_TOTAL_4_TL", "coeff_HTQ7_TOTAL_4_TG", "coeff_HTQ7_TOTAL_5_T",
        "coeff_HTQ7_TOTAL_5_TL", "coeff_HTQ7_TOTAL_5_TG", "coeff_HTQ7_TOTAL_6_T", "coeff_HTQ7_TOTAL_6_TL",
        "coeff_HTQ7_TOTAL_6_TG", "coeff_HTQ7_T", "coeff_HTQ7_TL", "coeff_HTQ7_TG", "coeff_HTQ7_TOTAL_7_T",
        "coeff_HTQ7_TOTAL_7_TL", "coeff_HTQ7_TOTAL_7_TG", "coeff_HTQ7_TOTAL_8_T", "coeff_HTQ7_TOTAL_8_TL",
        "coeff_HTQ7_TOTAL_8_TG", "coeff_HTQ7_TOTAL_9_T", "coeff_HTQ7_TOTAL_9_TL", "coeff_HTQ7_TOTAL_9_TG",
        "coeff_HTQ7_Odd", "coeff_HTQ7_Even"
    ], "bases": [
        "coeff_HTQ7_TOTAL_0_T", "coeff_HTQ7_TOTAL_1_T", "coeff_HTQ7_TOTAL_2_T", "coeff_HTQ7_TOTAL_3_T",
        "coeff_HTQ7_TOTAL_4_T", "coeff_HTQ7_TOTAL_5_T", "coeff_HTQ7_TOTAL_6_T", "coeff_HTQ7_T", "coeff_HTQ7_TOTAL_7_T",
        "coeff_HTQ7_TOTAL_8_T", "coeff_HTQ7_TOTAL_9_T"
    ], "odd": "coeff_HTQ7_"
    },
    {
        "name": t('markets.totals.points_quarter', {part: 8}), "sports": [
        "basketball"
    ], "template": "total", "id": 116, "group_id": 8, "dependencies": [
        "coeff_HTQ8_TOTAL_0_T", "coeff_HTQ8_TOTAL_0_TL", "coeff_HTQ8_TOTAL_0_TG", "coeff_HTQ8_TOTAL_1_T",
        "coeff_HTQ8_TOTAL_1_TL", "coeff_HTQ8_TOTAL_1_TG", "coeff_HTQ8_TOTAL_2_T", "coeff_HTQ8_TOTAL_2_TL",
        "coeff_HTQ8_TOTAL_2_TG", "coeff_HTQ8_TOTAL_3_T", "coeff_HTQ8_TOTAL_3_TL", "coeff_HTQ8_TOTAL_3_TG",
        "coeff_HTQ8_TOTAL_4_T", "coeff_HTQ8_TOTAL_4_TL", "coeff_HTQ8_TOTAL_4_TG", "coeff_HTQ8_TOTAL_5_T",
        "coeff_HTQ8_TOTAL_5_TL", "coeff_HTQ8_TOTAL_5_TG", "coeff_HTQ8_TOTAL_6_T", "coeff_HTQ8_TOTAL_6_TL",
        "coeff_HTQ8_TOTAL_6_TG", "coeff_HTQ8_TOTAL_7_T", "coeff_HTQ8_TOTAL_7_TL", "coeff_HTQ8_TOTAL_7_TG",
        "coeff_HTQ8_T", "coeff_HTQ8_TL", "coeff_HTQ8_TG", "coeff_HTQ8_TOTAL_8_T", "coeff_HTQ8_TOTAL_8_TL",
        "coeff_HTQ8_TOTAL_8_TG", "coeff_HTQ8_TOTAL_9_T", "coeff_HTQ8_TOTAL_9_TL", "coeff_HTQ8_TOTAL_9_TG",
        "coeff_HTQ8_Odd", "coeff_HTQ8_Even"
    ], "bases": [
        "coeff_HTQ8_TOTAL_0_T", "coeff_HTQ8_TOTAL_1_T", "coeff_HTQ8_TOTAL_2_T", "coeff_HTQ8_TOTAL_3_T",
        "coeff_HTQ8_TOTAL_4_T", "coeff_HTQ8_TOTAL_5_T", "coeff_HTQ8_TOTAL_6_T", "coeff_HTQ8_TOTAL_7_T", "coeff_HTQ8_T",
        "coeff_HTQ8_TOTAL_8_T", "coeff_HTQ8_TOTAL_9_T"
    ], "odd": "coeff_HTQ8_"
    },
    {
        "name": t('markets.totals.points_quarter', {part: 9}), "sports": [
        "basketball"
    ], "template": "total", "id": 117, "group_id": 8, "dependencies": [
        "coeff_HTQ9_TOTAL_0_T", "coeff_HTQ9_TOTAL_0_TL", "coeff_HTQ9_TOTAL_0_TG", "coeff_HTQ9_TOTAL_1_T",
        "coeff_HTQ9_TOTAL_1_TL", "coeff_HTQ9_TOTAL_1_TG", "coeff_HTQ9_TOTAL_2_T", "coeff_HTQ9_TOTAL_2_TL",
        "coeff_HTQ9_TOTAL_2_TG", "coeff_HTQ9_TOTAL_3_T", "coeff_HTQ9_TOTAL_3_TL", "coeff_HTQ9_TOTAL_3_TG",
        "coeff_HTQ9_TOTAL_4_T", "coeff_HTQ9_TOTAL_4_TL", "coeff_HTQ9_TOTAL_4_TG", "coeff_HTQ9_TOTAL_5_T",
        "coeff_HTQ9_TOTAL_5_TL", "coeff_HTQ9_TOTAL_5_TG", "coeff_HTQ9_TOTAL_6_T", "coeff_HTQ9_TOTAL_6_TL",
        "coeff_HTQ9_TOTAL_6_TG", "coeff_HTQ9_TOTAL_7_T", "coeff_HTQ9_TOTAL_7_TL", "coeff_HTQ9_TOTAL_7_TG",
        "coeff_HTQ9_TOTAL_8_T", "coeff_HTQ9_TOTAL_8_TL", "coeff_HTQ9_TOTAL_8_TG", "coeff_HTQ9_T", "coeff_HTQ9_TL",
        "coeff_HTQ9_TG", "coeff_HTQ9_TOTAL_9_T", "coeff_HTQ9_TOTAL_9_TL", "coeff_HTQ9_TOTAL_9_TG", "coeff_HTQ9_Odd",
        "coeff_HTQ9_Even"
    ], "bases": [
        "coeff_HTQ9_TOTAL_0_T", "coeff_HTQ9_TOTAL_1_T", "coeff_HTQ9_TOTAL_2_T", "coeff_HTQ9_TOTAL_3_T",
        "coeff_HTQ9_TOTAL_4_T", "coeff_HTQ9_TOTAL_5_T", "coeff_HTQ9_TOTAL_6_T", "coeff_HTQ9_TOTAL_7_T",
        "coeff_HTQ9_TOTAL_8_T", "coeff_HTQ9_T", "coeff_HTQ9_TOTAL_9_T"
    ], "odd": "coeff_HTQ9_"
    },
    {
        "name": t('markets.totals.points_quarter', {part: 10}), "sports": [
        "basketball"
    ], "template": "total", "id": 118, "group_id": 8, "dependencies": [
        "coeff_HTQ10_TOTAL_0_T", "coeff_HTQ10_TOTAL_0_TL", "coeff_HTQ10_TOTAL_0_TG", "coeff_HTQ10_TOTAL_1_T",
        "coeff_HTQ10_TOTAL_1_TL", "coeff_HTQ10_TOTAL_1_TG", "coeff_HTQ10_TOTAL_2_T", "coeff_HTQ10_TOTAL_2_TL",
        "coeff_HTQ10_TOTAL_2_TG", "coeff_HTQ10_TOTAL_3_T", "coeff_HTQ10_TOTAL_3_TL", "coeff_HTQ10_TOTAL_3_TG",
        "coeff_HTQ10_TOTAL_4_T", "coeff_HTQ10_TOTAL_4_TL", "coeff_HTQ10_TOTAL_4_TG", "coeff_HTQ10_TOTAL_5_T",
        "coeff_HTQ10_TOTAL_5_TL", "coeff_HTQ10_TOTAL_5_TG", "coeff_HTQ10_TOTAL_6_T", "coeff_HTQ10_TOTAL_6_TL",
        "coeff_HTQ10_TOTAL_6_TG", "coeff_HTQ10_TOTAL_7_T", "coeff_HTQ10_TOTAL_7_TL", "coeff_HTQ10_TOTAL_7_TG",
        "coeff_HTQ10_TOTAL_8_T", "coeff_HTQ10_TOTAL_8_TL", "coeff_HTQ10_TOTAL_8_TG", "coeff_HTQ10_TOTAL_9_T",
        "coeff_HTQ10_TOTAL_9_TL", "coeff_HTQ10_TOTAL_9_TG", "coeff_HTQ10_Odd", "coeff_HTQ10_Even"
    ], "bases": [
        "coeff_HTQ10_TOTAL_0_T", "coeff_HTQ10_TOTAL_1_T", "coeff_HTQ10_TOTAL_2_T", "coeff_HTQ10_TOTAL_3_T",
        "coeff_HTQ10_TOTAL_4_T", "coeff_HTQ10_TOTAL_5_T", "coeff_HTQ10_TOTAL_6_T", "coeff_HTQ10_TOTAL_7_T",
        "coeff_HTQ10_TOTAL_8_T", "coeff_HTQ10_TOTAL_9_T"
    ], "odd": "coeff_HTQ10_"
    },
    {
        "name": t('markets.outcomes.period', {part: 1}), "sports": [
        "hockey"
    ], "template": "simple_list", "rows": [
        {"title": t('markets.home_victory'), "name": "coeff_HTP1_1"},
        {"title": t('markets.win_nil', {team: '{H}'}), "name": " coeff_DCHTP1_1X"},
        {"title": t('markets.draw'), "name": "coeff_HTP1_X"},
        {"title": t('markets.away_victory'), "name": "coeff_HTP1_2"},
        {"title": t('markets.win_nil', {team: '{A}'}), "name": "coeff_DCHTP1_X2"},
        {"title": t('markets.any_victory'), "name": "coeff_DCHTP1_12"}
    ], "id": 119, "group_id": 9, "dependencies": [
        "coeff_HTP1_1", "coeff_DCHTP1_1X", "coeff_HTP1_X", "coeff_HTP1_2",
        "coeff_DCHTP1_X2", "coeff_DCHTP1_12"
    ]
    },
    {
        "name": t('markets.fora.period', {part: 1}),
        "template": "fora",
        "sports": ["hockey"],
        "id": 120,
        "group_id": 9,
        "dependencies": [
            "coeff_ODDS_HTT1_0ODDS", "coeff_ODDS_HTT1_0ODDS_A",
            "coeff_ODDS_HTT1_0ODDS_H", "coeff_ODDS_HTT1_1ODDS", "coeff_ODDS_HTT1_1ODDS_A", "coeff_ODDS_HTT1_1ODDS_H",
            "coeff_ODDS_HTT1_2ODDS", "coeff_ODDS_HTT1_2ODDS_A", "coeff_ODDS_HTT1_2ODDS_H", "coeff_ODDS_HTT1_3ODDS",
            "coeff_ODDS_HTT1_3ODDS_A", "coeff_ODDS_HTT1_3ODDS_H", "coeff_ODDS_HTT1_4ODDS", "coeff_ODDS_HTT1_4ODDS_A",
            "coeff_ODDS_HTT1_4ODDS_H", "coeff_ODDS_HTT1_5ODDS", "coeff_ODDS_HTT1_5ODDS_A", "coeff_ODDS_HTT1_5ODDS_H",
            "coeff_ODDS_HTT1_6ODDS", "coeff_ODDS_HTT1_6ODDS_A", "coeff_ODDS_HTT1_6ODDS_H", "coeff_ODDS_HTT1_7ODDS",
            "coeff_ODDS_HTT1_7ODDS_A", "coeff_ODDS_HTT1_7ODDS_H", "coeff_ODDS_HTT1_8ODDS", "coeff_ODDS_HTT1_8ODDS_A",
            "coeff_ODDS_HTT1_8ODDS_H", "coeff_ODDS_HTT1_9ODDS", "coeff_ODDS_HTT1_9ODDS_A", "coeff_ODDS_HTT1_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HTT1_0ODDS", "coeff_ODDS_HTT1_1ODDS", "coeff_ODDS_HTT1_2ODDS", "coeff_ODDS_HTT1_3ODDS",
            "coeff_ODDS_HTT1_4ODDS", "coeff_ODDS_HTT1_5ODDS", "coeff_ODDS_HTT1_6ODDS", "coeff_ODDS_HTT1_7ODDS",
            "coeff_ODDS_HTT1_8ODDS", "coeff_ODDS_HTT1_9ODDS"
        ]
    },
    {
        "name": t('markets.outcomes.period', {part: 2}), "sports": [
        "hockey"
    ], "template": "simple_list", "rows": [
        {"title": t('markets.home_victory'), "name": "coeff_HTP2_1"},
        {"title": t('markets.win_nil', {team: '{H}'}), "name": "coeff_DCHTP2_1X"},
        {"title": t('markets.draw'), "name": "coeff_HTP2_X"},
        {"title": t('markets.away_victory'), "name": "coeff_HTP2_2"},
        {"title": t('markets.win_nil', {team: '{A}'}), "name": "coeff_DCHTP2_X2"},
        {"title": t('markets.any_victory'), "name": "coeff_DCHTP2_12"}
    ], "id": 121, "group_id": 9, "dependencies": [
        "coeff_HTP2_1", "coeff_DCHTP2_1X", "coeff_HTP2_X", "coeff_HTP2_2",
        "coeff_DCHTP2_X2", "coeff_DCHTP2_12"
    ]
    },
    {
        "name": t('markets.fora.period', {part: 2}),
        "template": "fora",
        "sports": ["hockey"],
        "id": 122,
        "group_id": 9,
        "dependencies": [
            "coeff_ODDS_HTT2_0ODDS", "coeff_ODDS_HTT2_0ODDS_A",
            "coeff_ODDS_HTT2_0ODDS_H", "coeff_ODDS_HTT2_1ODDS", "coeff_ODDS_HTT2_1ODDS_A", "coeff_ODDS_HTT2_1ODDS_H",
            "coeff_ODDS_HTT2_2ODDS", "coeff_ODDS_HTT2_2ODDS_A", "coeff_ODDS_HTT2_2ODDS_H", "coeff_ODDS_HTT2_3ODDS",
            "coeff_ODDS_HTT2_3ODDS_A", "coeff_ODDS_HTT2_3ODDS_H", "coeff_ODDS_HTT2_4ODDS", "coeff_ODDS_HTT2_4ODDS_A",
            "coeff_ODDS_HTT2_4ODDS_H", "coeff_ODDS_HTT2_5ODDS", "coeff_ODDS_HTT2_5ODDS_A", "coeff_ODDS_HTT2_5ODDS_H",
            "coeff_ODDS_HTT2_6ODDS", "coeff_ODDS_HTT2_6ODDS_A", "coeff_ODDS_HTT2_6ODDS_H", "coeff_ODDS_HTT2_7ODDS",
            "coeff_ODDS_HTT2_7ODDS_A", "coeff_ODDS_HTT2_7ODDS_H", "coeff_ODDS_HTT2_8ODDS", "coeff_ODDS_HTT2_8ODDS_A",
            "coeff_ODDS_HTT2_8ODDS_H", "coeff_ODDS_HTT2_9ODDS", "coeff_ODDS_HTT2_9ODDS_A", "coeff_ODDS_HTT2_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HTT2_0ODDS", "coeff_ODDS_HTT2_1ODDS", "coeff_ODDS_HTT2_2ODDS", "coeff_ODDS_HTT2_3ODDS",
            "coeff_ODDS_HTT2_4ODDS", "coeff_ODDS_HTT2_5ODDS", "coeff_ODDS_HTT2_6ODDS", "coeff_ODDS_HTT2_7ODDS",
            "coeff_ODDS_HTT2_8ODDS", "coeff_ODDS_HTT2_9ODDS"
        ]
    },
    {
        "name": t('markets.outcomes.period', {part: 3}), "sports": [
        "hockey"
    ], "template": "simple_list", "rows": [
        {"title": t('markets.home_victory'), "name": "coeff_HTP3_1"},
        {"title": t('markets.win_nil', {team: '{H}'}), "name": "coeff_DCHTP3_1X"},
        {"title": t('markets.draw'), "name": "coeff_HTP3_X"},
        {"title": t('markets.away_victory'), "name": "coeff_HTP3_2"},
        {"title": t('markets.win_nil', {team: '{A}'}), "name": "coeff_DCHTP3_X2"},
        {"title": t('markets.any_victory'), "name": "coeff_DCHTP3_12"}
    ], "id": 123, "group_id": 9, "dependencies": [
        "coeff_HTP3_1", "coeff_DCHTP3_1X", "coeff_HTP3_X", "coeff_HTP3_2",
        "coeff_DCHTP3_X2", "coeff_DCHTP3_12"
    ]
    },
    {
        "name": t('markets.fora.period', {part: 3}),
        "template": "fora",
        "sports": ["hockey"],
        "id": 124,
        "group_id": 9,
        "dependencies": [
            "coeff_ODDS_HTT3_0ODDS", "coeff_ODDS_HTT3_0ODDS_A",
            "coeff_ODDS_HTT3_0ODDS_H", "coeff_ODDS_HTT3_1ODDS", "coeff_ODDS_HTT3_1ODDS_A", "coeff_ODDS_HTT3_1ODDS_H",
            "coeff_ODDS_HTT3_2ODDS", "coeff_ODDS_HTT3_2ODDS_A", "coeff_ODDS_HTT3_2ODDS_H", "coeff_ODDS_HTT3_3ODDS",
            "coeff_ODDS_HTT3_3ODDS_A", "coeff_ODDS_HTT3_3ODDS_H", "coeff_ODDS_HTT3_4ODDS", "coeff_ODDS_HTT3_4ODDS_A",
            "coeff_ODDS_HTT3_4ODDS_H", "coeff_ODDS_HTT3_5ODDS", "coeff_ODDS_HTT3_5ODDS_A", "coeff_ODDS_HTT3_5ODDS_H",
            "coeff_ODDS_HTT3_6ODDS", "coeff_ODDS_HTT3_6ODDS_A", "coeff_ODDS_HTT3_6ODDS_H", "coeff_ODDS_HTT3_7ODDS",
            "coeff_ODDS_HTT3_7ODDS_A", "coeff_ODDS_HTT3_7ODDS_H", "coeff_ODDS_HTT3_8ODDS", "coeff_ODDS_HTT3_8ODDS_A",
            "coeff_ODDS_HTT3_8ODDS_H", "coeff_ODDS_HTT3_9ODDS", "coeff_ODDS_HTT3_9ODDS_A", "coeff_ODDS_HTT3_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HTT3_0ODDS", "coeff_ODDS_HTT3_1ODDS", "coeff_ODDS_HTT3_2ODDS", "coeff_ODDS_HTT3_3ODDS",
            "coeff_ODDS_HTT3_4ODDS", "coeff_ODDS_HTT3_5ODDS", "coeff_ODDS_HTT3_6ODDS", "coeff_ODDS_HTT3_7ODDS",
            "coeff_ODDS_HTT3_8ODDS", "coeff_ODDS_HTT3_9ODDS"
        ]
    },
    {
        "name": t('markets.totals.goals_period', {part: 1}), "sports": [
        "hockey"
    ], "template": "total", "id": 125, "group_id": 9, "dependencies": [
        "coeff_HTT1_TOTAL_0_T", "coeff_HTT1_TOTAL_0_TL", "coeff_HTT1_TOTAL_0_TG", "coeff_HTP1_T", "coeff_HTP1_TL",
        "coeff_HTP1_TG", "coeff_HTT1_TOTAL_1_T", "coeff_HTT1_TOTAL_1_TL", "coeff_HTT1_TOTAL_1_TG",
        "coeff_HTT1_TOTAL_2_T", "coeff_HTT1_TOTAL_2_TL", "coeff_HTT1_TOTAL_2_TG", "coeff_HTT1_TOTAL_3_T",
        "coeff_HTT1_TOTAL_3_TL", "coeff_HTT1_TOTAL_3_TG", "coeff_HTT1_TOTAL_4_T", "coeff_HTT1_TOTAL_4_TL",
        "coeff_HTT1_TOTAL_4_TG", "coeff_HTT1_TOTAL_5_T", "coeff_HTT1_TOTAL_5_TL", "coeff_HTT1_TOTAL_5_TG",
        "coeff_HTT1_TOTAL_6_T", "coeff_HTT1_TOTAL_6_TL", "coeff_HTT1_TOTAL_6_TG", "coeff_HTT1_TOTAL_7_T",
        "coeff_HTT1_TOTAL_7_TL", "coeff_HTT1_TOTAL_7_TG", "coeff_HTT1_TOTAL_8_T", "coeff_HTT1_TOTAL_8_TL",
        "coeff_HTT1_TOTAL_8_TG", "coeff_HTT1_TOTAL_9_T", "coeff_HTT1_TOTAL_9_TL", "coeff_HTT1_TOTAL_9_TG",
        "coeff_HTT1_Odd", "coeff_HTT1_Even"
    ], "bases": [
        "coeff_HTT1_TOTAL_0_T", "coeff_HTP1_T", "coeff_HTT1_TOTAL_1_T", "coeff_HTT1_TOTAL_2_T",
        "coeff_HTT1_TOTAL_3_T", "coeff_HTT1_TOTAL_4_T", "coeff_HTT1_TOTAL_5_T", "coeff_HTT1_TOTAL_6_T",
        "coeff_HTT1_TOTAL_7_T", "coeff_HTT1_TOTAL_8_T", "coeff_HTT1_TOTAL_9_T"
    ], "odd": "coeff_HTT1_"
    },
    {
        "name": t('markets.totals.goals_period', {part: 2}), "sports": [
        "hockey"
    ], "template": "total", "id": 126, "group_id": 9, "dependencies": [
        "coeff_HTT2_TOTAL_0_T", "coeff_HTT2_TOTAL_0_TL", "coeff_HTT2_TOTAL_0_TG", "coeff_HTT2_TOTAL_1_T",
        "coeff_HTT2_TOTAL_1_TL", "coeff_HTT2_TOTAL_1_TG", "coeff_HTP2_T", "coeff_HTP2_TL", "coeff_HTP2_TG",
        "coeff_HTT2_TOTAL_2_T", "coeff_HTT2_TOTAL_2_TL", "coeff_HTT2_TOTAL_2_TG", "coeff_HTT2_TOTAL_3_T",
        "coeff_HTT2_TOTAL_3_TL", "coeff_HTT2_TOTAL_3_TG", "coeff_HTT2_TOTAL_4_T", "coeff_HTT2_TOTAL_4_TL",
        "coeff_HTT2_TOTAL_4_TG", "coeff_HTT2_TOTAL_5_T", "coeff_HTT2_TOTAL_5_TL", "coeff_HTT2_TOTAL_5_TG",
        "coeff_HTT2_TOTAL_6_T", "coeff_HTT2_TOTAL_6_TL", "coeff_HTT2_TOTAL_6_TG", "coeff_HTT2_TOTAL_7_T",
        "coeff_HTT2_TOTAL_7_TL", "coeff_HTT2_TOTAL_7_TG", "coeff_HTT2_TOTAL_8_T", "coeff_HTT2_TOTAL_8_TL",
        "coeff_HTT2_TOTAL_8_TG", "coeff_HTT2_TOTAL_9_T", "coeff_HTT2_TOTAL_9_TL", "coeff_HTT2_TOTAL_9_TG",
        "coeff_HTT2_Odd", "coeff_HTT2_Even"
    ], "bases": [
        "coeff_HTT2_TOTAL_0_T", "coeff_HTT2_TOTAL_1_T", "coeff_HTP2_T", "coeff_HTT2_TOTAL_2_T",
        "coeff_HTT2_TOTAL_3_T", "coeff_HTT2_TOTAL_4_T", "coeff_HTT2_TOTAL_5_T", "coeff_HTT2_TOTAL_6_T",
        "coeff_HTT2_TOTAL_7_T", "coeff_HTT2_TOTAL_8_T", "coeff_HTT2_TOTAL_9_T"
    ], "odd": "coeff_HTT2_"
    },
    {
        "name": t('markets.totals.goals_period', {part: 3}), "sports": [
        "hockey"
    ], "template": "total", "id": 127, "group_id": 9, "dependencies": [
        "coeff_HTT3_TOTAL_0_T", "coeff_HTT3_TOTAL_0_TL", "coeff_HTT3_TOTAL_0_TG", "coeff_HTT3_TOTAL_1_T",
        "coeff_HTT3_TOTAL_1_TL", "coeff_HTT3_TOTAL_1_TG", "coeff_HTT3_TOTAL_2_T", "coeff_HTT3_TOTAL_2_TL",
        "coeff_HTT3_TOTAL_2_TG", "coeff_HTP3_T", "coeff_HTP3_TL", "coeff_HTP3_TG", "coeff_HTT3_TOTAL_3_T",
        "coeff_HTT3_TOTAL_3_TL", "coeff_HTT3_TOTAL_3_TG", "coeff_HTT3_TOTAL_4_T", "coeff_HTT3_TOTAL_4_TL",
        "coeff_HTT3_TOTAL_4_TG", "coeff_HTT3_TOTAL_5_T", "coeff_HTT3_TOTAL_5_TL", "coeff_HTT3_TOTAL_5_TG",
        "coeff_HTT3_TOTAL_6_T", "coeff_HTT3_TOTAL_6_TL", "coeff_HTT3_TOTAL_6_TG", "coeff_HTT3_TOTAL_7_T",
        "coeff_HTT3_TOTAL_7_TL", "coeff_HTT3_TOTAL_7_TG", "coeff_HTT3_TOTAL_8_T", "coeff_HTT3_TOTAL_8_TL",
        "coeff_HTT3_TOTAL_8_TG", "coeff_HTT3_TOTAL_9_T", "coeff_HTT3_TOTAL_9_TL", "coeff_HTT3_TOTAL_9_TG",
        "coeff_HTT3_Odd", "coeff_HTT3_Even"
    ], "bases": [
        "coeff_HTT3_TOTAL_0_T", "coeff_HTT3_TOTAL_1_T", "coeff_HTT3_TOTAL_2_T", "coeff_HTP3_T",
        "coeff_HTT3_TOTAL_3_T", "coeff_HTT3_TOTAL_4_T", "coeff_HTT3_TOTAL_5_T", "coeff_HTT3_TOTAL_6_T",
        "coeff_HTT3_TOTAL_7_T", "coeff_HTT3_TOTAL_8_T", "coeff_HTT3_TOTAL_9_T"
    ], "odd": "coeff_HTT3_"
    },
    {
        "name": t('markets.totals.goals_period', {part: 4}), "sports": [
        "hockey"
    ], "template": "total", "id": 128, "group_id": 9, "dependencies": [
        "coeff_HTT4_TOTAL_0_T", "coeff_HTT4_TOTAL_0_TL", "coeff_HTT4_TOTAL_0_TG", "coeff_HTT4_TOTAL_1_T",
        "coeff_HTT4_TOTAL_1_TL", "coeff_HTT4_TOTAL_1_TG", "coeff_HTT4_TOTAL_2_T", "coeff_HTT4_TOTAL_2_TL",
        "coeff_HTT4_TOTAL_2_TG", "coeff_HTT4_TOTAL_3_T", "coeff_HTT4_TOTAL_3_TL", "coeff_HTT4_TOTAL_3_TG",
        "coeff_HTP4_T", "coeff_HTP4_TL", "coeff_HTP4_TG", "coeff_HTT4_TOTAL_4_T", "coeff_HTT4_TOTAL_4_TL",
        "coeff_HTT4_TOTAL_4_TG", "coeff_HTT4_TOTAL_5_T", "coeff_HTT4_TOTAL_5_TL", "coeff_HTT4_TOTAL_5_TG",
        "coeff_HTT4_TOTAL_6_T", "coeff_HTT4_TOTAL_6_TL", "coeff_HTT4_TOTAL_6_TG", "coeff_HTT4_TOTAL_7_T",
        "coeff_HTT4_TOTAL_7_TL", "coeff_HTT4_TOTAL_7_TG", "coeff_HTT4_TOTAL_8_T", "coeff_HTT4_TOTAL_8_TL",
        "coeff_HTT4_TOTAL_8_TG", "coeff_HTT4_TOTAL_9_T", "coeff_HTT4_TOTAL_9_TL", "coeff_HTT4_TOTAL_9_TG",
        "coeff_HTT4_Odd", "coeff_HTT4_Even"
    ], "bases": [
        "coeff_HTT4_TOTAL_0_T", "coeff_HTT4_TOTAL_1_T", "coeff_HTT4_TOTAL_2_T", "coeff_HTT4_TOTAL_3_T",
        "coeff_HTP4_T", "coeff_HTT4_TOTAL_4_T", "coeff_HTT4_TOTAL_5_T", "coeff_HTT4_TOTAL_6_T", "coeff_HTT4_TOTAL_7_T",
        "coeff_HTT4_TOTAL_8_T", "coeff_HTT4_TOTAL_9_T"
    ], "odd": "coeff_HTT4_"
    },
    {
        "name": {
            "default": t('markets.outcomes.set', {part: 1}),
            "volleyball": t('markets.outcomes.part', {part: 1}),
            "beach_volleyball": t('markets.outcomes.part', {part: 1})
        }, "sports": [
        "volleyball", "beach_volleyball", "tennis", "table_tennis", "badminton"
    ], "template": "simple_list", "rows": [
        {"title": t('markets.home_victory'), "name": "coeff_HTSCW1_P1"},
        {"title": t('markets.away_victory'), "name": "coeff_HTSCW1_P2"}
    ], "id": 129, "group_id": 10, "dependencies": ["coeff_HTSCW1_P1", "coeff_HTSCW1_P2"]
    },
    {
        "name": {
            "default": t('markets.tennis.set_victory', {part: 1}),
            "table_tennis": t('markets.table_tennis.part_victory', {part: 1}),
            "volleyball": t('markets.volleyball.part_victory', {part: 1}),
            "beach_volleyball": t('markets.volleyball.part_victory', {part: 1})
        }, "sports": [
        "volleyball", "beach_volleyball", "tennis", "table_tennis", "badminton"
    ], "template": "simple_list", "rows": [
        {"title": t('markets.home_victory'), "name": "coeff_HTSML1_1ML"},
        {"title": t('markets.away_victory'), "name": "coeff_HTSML1_2ML"}
    ], "id": 130, "group_id": 10, "dependencies": ["coeff_HTSML1_1ML", "coeff_HTSML1_2ML"]
    },
    {
        "name": {
            "default": t('markets.tennis.set_victory', {part: 2}),
            "table_tennis": t('markets.table_tennis.part_victory', {part: 2}),
            "volleyball": t('markets.volleyball.part_victory', {part: 2}),
            "beach_volleyball": t('markets.volleyball.part_victory', {part: 2})
        }, "sports": [
        "volleyball", "beach_volleyball", "tennis", "table_tennis", "badminton"
    ], "template": "simple_list", "rows": [
        {"title": t('markets.home_victory'), "name": "coeff_HTSML2_1ML"},
        {"title": t('markets.away_victory'), "name": "coeff_HTSML2_2ML"}
    ], "id": 131, "group_id": 10, "dependencies": ["coeff_HTSML2_1ML", "coeff_HTSML2_2ML"]
    },
    {
        "name": {
            "default": t('markets.tennis.set_victory', {part: 3}),
            "table_tennis": t('markets.table_tennis.part_victory', {part: 3}),
            "volleyball": t('markets.volleyball.part_victory', {part: 3}),
            "beach_volleyball": t('markets.volleyball.part_victory', {part: 3})
        }, "sports": [
        "volleyball", "beach_volleyball", "tennis", "table_tennis", "badminton"
    ], "template": "simple_list", "rows": [
        {"title": t('markets.home_victory'), "name": "coeff_HTSML3_1ML"},
        {"title": t('markets.away_victory'), "name": "coeff_HTSML3_2ML"}
    ], "id": 132, "group_id": 10, "dependencies": ["coeff_HTSML3_1ML", "coeff_HTSML3_2ML"]
    },
    {
        "name": {
            "default": t('markets.tennis.set_victory', {part: 4}),
            "table_tennis": t('markets.table_tennis.part_victory', {part: 4}),
            "volleyball": t('markets.volleyball.part_victory', {part: 4}),
            "beach_volleyball": t('markets.volleyball.part_victory', {part: 4})
        }, "sports": [
        "volleyball", "beach_volleyball", "tennis", "table_tennis", "badminton"
    ], "template": "simple_list", "rows": [
        {"title": t('markets.home_victory'), "name": "coeff_HTSML4_1ML"},
        {"title": t('markets.away_victory'), "name": "coeff_HTSML4_2ML"}
    ], "id": 133, "group_id": 10, "dependencies": ["coeff_HTSML4_1ML", "coeff_HTSML4_2ML"]
    },
    {
        "name": {
            "default": t('markets.tennis.set_victory', {part: 5}),
            "table_tennis": t('markets.table_tennis.part_victory', {part: 5}),
            "volleyball": t('markets.volleyball.part_victory', {part: 5}),
            "beach_volleyball": t('markets.volleyball.part_victory', {part: 5})
        }, "sports": [
        "volleyball", "beach_volleyball", "tennis", "table_tennis", "badminton"
    ], "template": "simple_list", "rows": [
        {"title": t('markets.home_victory'), "name": "coeff_HTSML5_1ML"},
        {"title": t('markets.away_victory'), "name": "coeff_HTSML5_2ML"}
    ], "id": 134, "group_id": 10, "dependencies": ["coeff_HTSML5_1ML", "coeff_HTSML5_2ML"]
    },
    {
        "name": t('markets.tennis.winners_by_set_and_games', {set: 1}), "sports": [
        "tennis"
    ], "template": "groupped_list", "binder": {"set": 1}, "id": 135, "group_id": 10, "dependencies": [
        "coeff_SET_1_GAME_1_WINNER_1", "coeff_SET_1_GAME_1_WINNER_2", "coeff_SET_1_GAME_2_WINNER_1",
        "coeff_SET_1_GAME_2_WINNER_2", "coeff_SET_1_GAME_3_WINNER_1", "coeff_SET_1_GAME_3_WINNER_2",
        "coeff_SET_1_GAME_4_WINNER_1", "coeff_SET_1_GAME_4_WINNER_2", "coeff_SET_1_GAME_5_WINNER_1",
        "coeff_SET_1_GAME_5_WINNER_2", "coeff_SET_1_GAME_6_WINNER_1", "coeff_SET_1_GAME_6_WINNER_2",
        "coeff_SET_1_GAME_7_WINNER_1", "coeff_SET_1_GAME_7_WINNER_2", "coeff_SET_1_GAME_8_WINNER_1",
        "coeff_SET_1_GAME_8_WINNER_2", "coeff_SET_1_GAME_9_WINNER_1", "coeff_SET_1_GAME_9_WINNER_2",
        "coeff_SET_1_GAME_10_WINNER_1", "coeff_SET_1_GAME_10_WINNER_2", "coeff_SET_1_GAME_11_WINNER_1",
        "coeff_SET_1_GAME_11_WINNER_2", "coeff_SET_1_GAME_12_WINNER_1", "coeff_SET_1_GAME_12_WINNER_2"
    ], "groups": [
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 1, set: 1}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_1_GAME_1_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_1_GAME_1_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 2, set: 1}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_1_GAME_2_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_1_GAME_2_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 3, set: 1}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_1_GAME_3_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_1_GAME_3_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 4, set: 1}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_1_GAME_4_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_1_GAME_4_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 5, set: 1}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_1_GAME_5_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_1_GAME_5_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 6, set: 1}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_1_GAME_6_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_1_GAME_6_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 7, set: 1}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_1_GAME_7_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_1_GAME_7_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 8, set: 1}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_1_GAME_8_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_1_GAME_8_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 9, set: 1}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_1_GAME_9_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_1_GAME_9_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 10, set: 1}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_1_GAME_10_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_1_GAME_10_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 11, set: 1}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_1_GAME_11_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_1_GAME_11_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 12, set: 1}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_1_GAME_12_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_1_GAME_12_WINNER_2"}
        ]
        }
    ]
    },
    {
        "name": t('markets.tennis.winners_by_set_and_games', {set: 2}), "sports": [
        "tennis"
    ], "template": "groupped_list", "binder": {"set": 2}, "id": 136, "group_id": 10, "dependencies": [
        "coeff_SET_2_GAME_1_WINNER_1", "coeff_SET_2_GAME_1_WINNER_2", "coeff_SET_2_GAME_2_WINNER_1",
        "coeff_SET_2_GAME_2_WINNER_2", "coeff_SET_2_GAME_3_WINNER_1", "coeff_SET_2_GAME_3_WINNER_2",
        "coeff_SET_2_GAME_4_WINNER_1", "coeff_SET_2_GAME_4_WINNER_2", "coeff_SET_2_GAME_5_WINNER_1",
        "coeff_SET_2_GAME_5_WINNER_2", "coeff_SET_2_GAME_6_WINNER_1", "coeff_SET_2_GAME_6_WINNER_2",
        "coeff_SET_2_GAME_7_WINNER_1", "coeff_SET_2_GAME_7_WINNER_2", "coeff_SET_2_GAME_8_WINNER_1",
        "coeff_SET_2_GAME_8_WINNER_2", "coeff_SET_2_GAME_9_WINNER_1", "coeff_SET_2_GAME_9_WINNER_2",
        "coeff_SET_2_GAME_10_WINNER_1", "coeff_SET_2_GAME_10_WINNER_2", "coeff_SET_2_GAME_11_WINNER_1",
        "coeff_SET_2_GAME_11_WINNER_2", "coeff_SET_2_GAME_12_WINNER_1", "coeff_SET_2_GAME_12_WINNER_2"
    ], "groups": [
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 1, set: 2}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_2_GAME_1_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_2_GAME_1_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 2, set: 2}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_2_GAME_2_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_2_GAME_2_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 3, set: 2}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_2_GAME_3_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_2_GAME_3_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 4, set: 2}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_2_GAME_4_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_2_GAME_4_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 5, set: 2}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_2_GAME_5_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_2_GAME_5_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 6, set: 2}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_2_GAME_6_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_2_GAME_6_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 7, set: 2}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_2_GAME_7_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_2_GAME_7_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 8, set: 2}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_2_GAME_8_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_2_GAME_8_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 9, set: 2}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_2_GAME_9_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_2_GAME_9_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 10, set: 2}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_2_GAME_10_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_2_GAME_10_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 11, set: 2}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_2_GAME_11_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_2_GAME_11_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 12, set: 2}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_2_GAME_12_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_2_GAME_12_WINNER_2"}
        ]
        }
    ]
    },
    {
        "name": t('markets.tennis.winners_by_set_and_games', {set: 3}), "sports": [
        "tennis"
    ], "template": "groupped_list", "binder": {"set": 3}, "id": 137, "group_id": 10, "dependencies": [
        "coeff_SET_3_GAME_1_WINNER_1", "coeff_SET_3_GAME_1_WINNER_2", "coeff_SET_3_GAME_2_WINNER_1",
        "coeff_SET_3_GAME_2_WINNER_2", "coeff_SET_3_GAME_3_WINNER_1", "coeff_SET_3_GAME_3_WINNER_2",
        "coeff_SET_3_GAME_4_WINNER_1", "coeff_SET_3_GAME_4_WINNER_2", "coeff_SET_3_GAME_5_WINNER_1",
        "coeff_SET_3_GAME_5_WINNER_2", "coeff_SET_3_GAME_6_WINNER_1", "coeff_SET_3_GAME_6_WINNER_2",
        "coeff_SET_3_GAME_7_WINNER_1", "coeff_SET_3_GAME_7_WINNER_2", "coeff_SET_3_GAME_8_WINNER_1",
        "coeff_SET_3_GAME_8_WINNER_2", "coeff_SET_3_GAME_9_WINNER_1", "coeff_SET_3_GAME_9_WINNER_2",
        "coeff_SET_3_GAME_10_WINNER_1", "coeff_SET_3_GAME_10_WINNER_2", "coeff_SET_3_GAME_11_WINNER_1",
        "coeff_SET_3_GAME_11_WINNER_2", "coeff_SET_3_GAME_12_WINNER_1", "coeff_SET_3_GAME_12_WINNER_2"
    ], "groups": [
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 1, set: 3}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_3_GAME_1_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_3_GAME_1_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 2, set: 3}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_3_GAME_2_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_3_GAME_2_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 3, set: 3}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_3_GAME_3_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_3_GAME_3_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 4, set: 3}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_3_GAME_4_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_3_GAME_4_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 5, set: 3}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_3_GAME_5_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_3_GAME_5_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 6, set: 3}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_3_GAME_6_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_3_GAME_6_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 7, set: 3}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_3_GAME_7_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_3_GAME_7_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 8, set: 3}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_3_GAME_8_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_3_GAME_8_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 9, set: 3}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_3_GAME_9_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_3_GAME_9_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 10, set: 3}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_3_GAME_10_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_3_GAME_10_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 11, set: 3}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_3_GAME_11_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_3_GAME_11_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 12, set: 3}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_3_GAME_12_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_3_GAME_12_WINNER_2"}
        ]
        }
    ]
    },
    {
        "name": t('markets.tennis.winners_by_set_and_games', {set: 4}), "sports": [
        "tennis"
    ], "template": "groupped_list", "binder": {"set": 4}, "id": 138, "group_id": 10, "dependencies": [
        "coeff_SET_4_GAME_1_WINNER_1", "coeff_SET_4_GAME_1_WINNER_2", "coeff_SET_4_GAME_2_WINNER_1",
        "coeff_SET_4_GAME_2_WINNER_2", "coeff_SET_4_GAME_3_WINNER_1", "coeff_SET_4_GAME_3_WINNER_2",
        "coeff_SET_4_GAME_4_WINNER_1", "coeff_SET_4_GAME_4_WINNER_2", "coeff_SET_4_GAME_5_WINNER_1",
        "coeff_SET_4_GAME_5_WINNER_2", "coeff_SET_4_GAME_6_WINNER_1", "coeff_SET_4_GAME_6_WINNER_2",
        "coeff_SET_4_GAME_7_WINNER_1", "coeff_SET_4_GAME_7_WINNER_2", "coeff_SET_4_GAME_8_WINNER_1",
        "coeff_SET_4_GAME_8_WINNER_2", "coeff_SET_4_GAME_9_WINNER_1", "coeff_SET_4_GAME_9_WINNER_2",
        "coeff_SET_4_GAME_10_WINNER_1", "coeff_SET_4_GAME_10_WINNER_2", "coeff_SET_4_GAME_11_WINNER_1",
        "coeff_SET_4_GAME_11_WINNER_2", "coeff_SET_4_GAME_12_WINNER_1", "coeff_SET_4_GAME_12_WINNER_2"
    ], "groups": [
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 1, set: 4}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_4_GAME_1_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_4_GAME_1_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 2, set: 4}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_4_GAME_2_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_4_GAME_2_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 3, set: 4}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_4_GAME_3_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_4_GAME_3_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 4, set: 4}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_4_GAME_4_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_4_GAME_4_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 5, set: 4}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_4_GAME_5_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_4_GAME_5_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 6, set: 4}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_4_GAME_6_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_4_GAME_6_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 7, set: 4}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_4_GAME_7_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_4_GAME_7_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 8, set: 4}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_4_GAME_8_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_4_GAME_8_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 9, set: 4}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_4_GAME_9_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_4_GAME_9_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 10, set: 4}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_4_GAME_10_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_4_GAME_10_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 11, set: 4}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_4_GAME_11_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_4_GAME_11_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 12, set: 4}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_4_GAME_12_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_4_GAME_12_WINNER_2"}
        ]
        }
    ]
    },
    {
        "name": t('markets.tennis.winners_by_set_and_games', {set: 5}), "sports": [
        "tennis"
    ], "template": "groupped_list", "binder": {"set": 5}, "id": 139, "group_id": 10, "dependencies": [
        "coeff_SET_5_GAME_1_WINNER_1", "coeff_SET_5_GAME_1_WINNER_2", "coeff_SET_5_GAME_2_WINNER_1",
        "coeff_SET_5_GAME_2_WINNER_2", "coeff_SET_5_GAME_3_WINNER_1", "coeff_SET_5_GAME_3_WINNER_2",
        "coeff_SET_5_GAME_4_WINNER_1", "coeff_SET_5_GAME_4_WINNER_2", "coeff_SET_5_GAME_5_WINNER_1",
        "coeff_SET_5_GAME_5_WINNER_2", "coeff_SET_5_GAME_6_WINNER_1", "coeff_SET_5_GAME_6_WINNER_2",
        "coeff_SET_5_GAME_7_WINNER_1", "coeff_SET_5_GAME_7_WINNER_2", "coeff_SET_5_GAME_8_WINNER_1",
        "coeff_SET_5_GAME_8_WINNER_2", "coeff_SET_5_GAME_9_WINNER_1", "coeff_SET_5_GAME_9_WINNER_2",
        "coeff_SET_5_GAME_10_WINNER_1", "coeff_SET_5_GAME_10_WINNER_2", "coeff_SET_5_GAME_11_WINNER_1",
        "coeff_SET_5_GAME_11_WINNER_2", "coeff_SET_5_GAME_12_WINNER_1", "coeff_SET_5_GAME_12_WINNER_2"
    ], "groups": [
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 1, set: 5}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_5_GAME_1_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_5_GAME_1_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 2, set: 5}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_5_GAME_2_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_5_GAME_2_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 3, set: 5}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_5_GAME_3_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_5_GAME_3_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 4, set: 5}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_5_GAME_4_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_5_GAME_4_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 5, set: 5}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_5_GAME_5_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_5_GAME_5_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 6, set: 5}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_5_GAME_6_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_5_GAME_6_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 7, set: 5}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_5_GAME_7_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_5_GAME_7_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 8, set: 5}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_5_GAME_8_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_5_GAME_8_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 9, set: 5}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_5_GAME_9_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_5_GAME_9_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 10, set: 5}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_5_GAME_10_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_5_GAME_10_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 11, set: 5}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_5_GAME_11_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_5_GAME_11_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winner_by_set_and_game', {game: 12, set: 5}), "mnemonics": [
            {"title": "{H}", "name": "coeff_SET_5_GAME_12_WINNER_1"},
            {"title": "{A}", "name": "coeff_SET_5_GAME_12_WINNER_2"}
        ]
        }
    ]
    },
    {
        "name": t('markets.tennis.winners_in_game'), "sports": [
        "tennis"
    ], "template": "groupped_list", "id": 140, "group_id": 10, "dependencies": [
        "coeff_GAME_1_WINNER_1", "coeff_GAME_1_WINNER_2", "coeff_GAME_2_WINNER_1", "coeff_GAME_2_WINNER_2",
        "coeff_GAME_3_WINNER_1", "coeff_GAME_3_WINNER_2", "coeff_GAME_4_WINNER_1", "coeff_GAME_4_WINNER_2",
        "coeff_GAME_5_WINNER_1", "coeff_GAME_5_WINNER_2", "coeff_GAME_6_WINNER_1", "coeff_GAME_6_WINNER_2",
        "coeff_GAME_7_WINNER_1", "coeff_GAME_7_WINNER_2", "coeff_GAME_8_WINNER_1", "coeff_GAME_8_WINNER_2",
        "coeff_GAME_9_WINNER_1", "coeff_GAME_9_WINNER_2", "coeff_GAME_10_WINNER_1", "coeff_GAME_10_WINNER_2",
        "coeff_GAME_11_WINNER_1", "coeff_GAME_11_WINNER_2", "coeff_GAME_12_WINNER_1", "coeff_GAME_12_WINNER_2",
        "coeff_GAME_13_WINNER_1", "coeff_GAME_13_WINNER_2", "coeff_GAME_14_WINNER_1", "coeff_GAME_14_WINNER_2",
        "coeff_GAME_15_WINNER_1", "coeff_GAME_15_WINNER_2", "coeff_GAME_16_WINNER_1", "coeff_GAME_16_WINNER_2",
        "coeff_GAME_17_WINNER_1", "coeff_GAME_17_WINNER_2", "coeff_GAME_18_WINNER_1", "coeff_GAME_18_WINNER_2",
        "coeff_GAME_19_WINNER_1", "coeff_GAME_19_WINNER_2", "coeff_GAME_20_WINNER_1", "coeff_GAME_20_WINNER_2",
        "coeff_GAME_21_WINNER_1", "coeff_GAME_21_WINNER_2", "coeff_GAME_22_WINNER_1", "coeff_GAME_22_WINNER_2",
        "coeff_GAME_23_WINNER_1", "coeff_GAME_23_WINNER_2", "coeff_GAME_24_WINNER_1", "coeff_GAME_24_WINNER_2",
        "coeff_GAME_25_WINNER_1", "coeff_GAME_25_WINNER_2", "coeff_GAME_26_WINNER_1", "coeff_GAME_26_WINNER_2",
        "coeff_GAME_27_WINNER_1", "coeff_GAME_27_WINNER_2", "coeff_GAME_28_WINNER_1", "coeff_GAME_28_WINNER_2",
        "coeff_GAME_29_WINNER_1", "coeff_GAME_29_WINNER_2", "coeff_GAME_30_WINNER_1", "coeff_GAME_30_WINNER_2",
        "coeff_GAME_31_WINNER_1", "coeff_GAME_31_WINNER_2", "coeff_GAME_32_WINNER_1", "coeff_GAME_32_WINNER_2",
        "coeff_GAME_33_WINNER_1", "coeff_GAME_33_WINNER_2", "coeff_GAME_34_WINNER_1", "coeff_GAME_34_WINNER_2",
        "coeff_GAME_35_WINNER_1", "coeff_GAME_35_WINNER_2", "coeff_GAME_36_WINNER_1", "coeff_GAME_36_WINNER_2",
        "coeff_GAME_37_WINNER_1", "coeff_GAME_37_WINNER_2", "coeff_GAME_38_WINNER_1", "coeff_GAME_38_WINNER_2",
        "coeff_GAME_39_WINNER_1", "coeff_GAME_39_WINNER_2", "coeff_GAME_40_WINNER_1", "coeff_GAME_40_WINNER_2",
        "coeff_GAME_41_WINNER_1", "coeff_GAME_41_WINNER_2", "coeff_GAME_42_WINNER_1", "coeff_GAME_42_WINNER_2",
        "coeff_GAME_43_WINNER_1", "coeff_GAME_43_WINNER_2", "coeff_GAME_44_WINNER_1", "coeff_GAME_44_WINNER_2",
        "coeff_GAME_45_WINNER_1", "coeff_GAME_45_WINNER_2", "coeff_GAME_46_WINNER_1", "coeff_GAME_46_WINNER_2",
        "coeff_GAME_47_WINNER_1", "coeff_GAME_47_WINNER_2", "coeff_GAME_48_WINNER_1", "coeff_GAME_48_WINNER_2",
        "coeff_GAME_49_WINNER_1", "coeff_GAME_49_WINNER_2", "coeff_GAME_50_WINNER_1", "coeff_GAME_50_WINNER_2",
        "coeff_GAME_51_WINNER_1", "coeff_GAME_51_WINNER_2", "coeff_GAME_52_WINNER_1", "coeff_GAME_52_WINNER_2",
        "coeff_GAME_53_WINNER_1", "coeff_GAME_53_WINNER_2", "coeff_GAME_54_WINNER_1", "coeff_GAME_54_WINNER_2",
        "coeff_GAME_55_WINNER_1", "coeff_GAME_55_WINNER_2", "coeff_GAME_56_WINNER_1", "coeff_GAME_56_WINNER_2",
        "coeff_GAME_57_WINNER_1", "coeff_GAME_57_WINNER_2", "coeff_GAME_58_WINNER_1", "coeff_GAME_58_WINNER_2",
        "coeff_GAME_59_WINNER_1", "coeff_GAME_59_WINNER_2", "coeff_GAME_60_WINNER_1", "coeff_GAME_60_WINNER_2",
        "coeff_GAME_61_WINNER_1", "coeff_GAME_61_WINNER_2", "coeff_GAME_62_WINNER_1", "coeff_GAME_62_WINNER_2",
        "coeff_GAME_63_WINNER_1", "coeff_GAME_63_WINNER_2", "coeff_GAME_64_WINNER_1", "coeff_GAME_64_WINNER_2",
        "coeff_GAME_65_WINNER_1", "coeff_GAME_65_WINNER_2"
    ], "groups": [
        {
            "title": t('markets.tennis.winners_in_game_', {game: 1}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_1_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_1_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 2}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_2_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_2_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 3}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_3_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_3_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 4}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_4_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_4_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 5}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_5_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_5_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 6}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_6_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_6_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 7}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_7_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_7_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 8}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_8_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_8_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 9}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_9_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_9_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 10}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_10_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_10_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 11}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_11_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_11_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 12}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_12_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_12_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 13}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_13_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_13_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 14}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_14_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_14_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 15}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_15_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_15_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 16}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_16_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_16_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 17}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_17_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_17_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 18}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_18_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_18_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 19}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_19_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_19_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 20}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_20_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_20_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 21}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_21_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_21_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 22}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_22_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_22_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 23}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_23_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_23_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 24}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_24_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_24_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 25}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_25_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_25_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 26}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_26_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_26_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 27}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_27_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_27_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 28}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_28_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_28_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 29}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_29_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_29_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 30}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_30_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_30_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 31}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_31_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_31_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 32}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_32_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_32_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 33}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_33_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_33_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 34}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_34_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_34_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 35}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_35_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_35_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 36}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_36_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_36_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 37}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_37_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_37_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 38}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_38_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_38_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 39}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_39_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_39_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 40}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_40_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_40_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 41}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_41_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_41_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 42}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_42_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_42_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 43}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_43_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_43_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 44}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_44_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_44_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 45}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_45_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_45_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 46}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_46_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_46_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 47}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_47_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_47_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 48}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_48_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_48_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 49}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_49_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_49_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 50}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_50_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_50_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 51}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_51_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_51_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 52}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_52_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_52_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 53}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_53_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_53_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 54}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_54_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_54_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 55}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_55_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_55_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 56}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_56_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_56_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 57}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_57_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_57_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 58}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_58_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_58_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 59}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_59_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_59_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 60}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_60_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_60_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 61}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_61_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_61_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 62}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_62_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_62_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 63}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_63_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_63_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 64}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_64_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_64_WINNER_2"}
        ]
        },
        {
            "title": t('markets.tennis.winners_in_game_', {game: 65}), "mnemonics": [
            {"title": "{H}", "name": "coeff_GAME_65_WINNER_1"},
            {"title": "{A}", "name": "coeff_GAME_65_WINNER_2"}
        ]
        }
    ]
    },
    {
        "name": t('markets.tennis.exact_score_by_set', {set: 1}), "sports": [
        "tennis"
    ], "template": "column_list", "binder": {"set": 1}, "id": 141, "group_id": 10, "dependencies": [
        "coeff_EXACT_SCORE_TENNIS_HTS1_0_0", "coeff_EXACT_SCORE_TENNIS_HTS1_0_1",
        "coeff_EXACT_SCORE_TENNIS_HTS1_0_2",
        "coeff_EXACT_SCORE_TENNIS_HTS1_0_3", "coeff_EXACT_SCORE_TENNIS_HTS1_0_4",
        "coeff_EXACT_SCORE_TENNIS_HTS1_0_5", "coeff_EXACT_SCORE_TENNIS_HTS1_0_6",
        "coeff_EXACT_SCORE_TENNIS_HTS1_0_7", "coeff_EXACT_SCORE_TENNIS_HTS1_1_0",
        "coeff_EXACT_SCORE_TENNIS_HTS1_1_1", "coeff_EXACT_SCORE_TENNIS_HTS1_1_2",
        "coeff_EXACT_SCORE_TENNIS_HTS1_1_3", "coeff_EXACT_SCORE_TENNIS_HTS1_1_4",
        "coeff_EXACT_SCORE_TENNIS_HTS1_1_5", "coeff_EXACT_SCORE_TENNIS_HTS1_1_6",
        "coeff_EXACT_SCORE_TENNIS_HTS1_1_7", "coeff_EXACT_SCORE_TENNIS_HTS1_2_0",
        "coeff_EXACT_SCORE_TENNIS_HTS1_2_1", "coeff_EXACT_SCORE_TENNIS_HTS1_2_2",
        "coeff_EXACT_SCORE_TENNIS_HTS1_2_3", "coeff_EXACT_SCORE_TENNIS_HTS1_2_4",
        "coeff_EXACT_SCORE_TENNIS_HTS1_2_5", "coeff_EXACT_SCORE_TENNIS_HTS1_2_6",
        "coeff_EXACT_SCORE_TENNIS_HTS1_2_7", "coeff_EXACT_SCORE_TENNIS_HTS1_3_0",
        "coeff_EXACT_SCORE_TENNIS_HTS1_3_1", "coeff_EXACT_SCORE_TENNIS_HTS1_3_2",
        "coeff_EXACT_SCORE_TENNIS_HTS1_3_3", "coeff_EXACT_SCORE_TENNIS_HTS1_3_4",
        "coeff_EXACT_SCORE_TENNIS_HTS1_3_5", "coeff_EXACT_SCORE_TENNIS_HTS1_3_6",
        "coeff_EXACT_SCORE_TENNIS_HTS1_3_7", "coeff_EXACT_SCORE_TENNIS_HTS1_4_0",
        "coeff_EXACT_SCORE_TENNIS_HTS1_4_1", "coeff_EXACT_SCORE_TENNIS_HTS1_4_2",
        "coeff_EXACT_SCORE_TENNIS_HTS1_4_3", "coeff_EXACT_SCORE_TENNIS_HTS1_4_4",
        "coeff_EXACT_SCORE_TENNIS_HTS1_4_5", "coeff_EXACT_SCORE_TENNIS_HTS1_4_6",
        "coeff_EXACT_SCORE_TENNIS_HTS1_4_7", "coeff_EXACT_SCORE_TENNIS_HTS1_5_0",
        "coeff_EXACT_SCORE_TENNIS_HTS1_5_1", "coeff_EXACT_SCORE_TENNIS_HTS1_5_2",
        "coeff_EXACT_SCORE_TENNIS_HTS1_5_3", "coeff_EXACT_SCORE_TENNIS_HTS1_5_4",
        "coeff_EXACT_SCORE_TENNIS_HTS1_5_5", "coeff_EXACT_SCORE_TENNIS_HTS1_5_6",
        "coeff_EXACT_SCORE_TENNIS_HTS1_5_7", "coeff_EXACT_SCORE_TENNIS_HTS1_6_0",
        "coeff_EXACT_SCORE_TENNIS_HTS1_6_1", "coeff_EXACT_SCORE_TENNIS_HTS1_6_2",
        "coeff_EXACT_SCORE_TENNIS_HTS1_6_3", "coeff_EXACT_SCORE_TENNIS_HTS1_6_4",
        "coeff_EXACT_SCORE_TENNIS_HTS1_6_5", "coeff_EXACT_SCORE_TENNIS_HTS1_6_6",
        "coeff_EXACT_SCORE_TENNIS_HTS1_6_7", "coeff_EXACT_SCORE_TENNIS_HTS1_7_0",
        "coeff_EXACT_SCORE_TENNIS_HTS1_7_1", "coeff_EXACT_SCORE_TENNIS_HTS1_7_2",
        "coeff_EXACT_SCORE_TENNIS_HTS1_7_3", "coeff_EXACT_SCORE_TENNIS_HTS1_7_4",
        "coeff_EXACT_SCORE_TENNIS_HTS1_7_5", "coeff_EXACT_SCORE_TENNIS_HTS1_7_6",
        "coeff_EXACT_SCORE_TENNIS_HTS1_7_7"
    ], "columns": [
        {
            "title": "{H}", "rows": [
            {"title": "1-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_1_0"},
            {"title": "2-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_2_0"},
            {"title": "2-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_2_1"},
            {"title": "3-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_3_0"},
            {"title": "3-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_3_1"},
            {"title": "3-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_3_2"},
            {"title": "4-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_4_0"},
            {"title": "4-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_4_1"},
            {"title": "4-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_4_2"},
            {"title": "4-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_4_3"},
            {"title": "5-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_5_0"},
            {"title": "5-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_5_1"},
            {"title": "5-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_5_2"},
            {"title": "5-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_5_3"},
            {"title": "5-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_5_4"},
            {"title": "6-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_6_0"},
            {"title": "6-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_6_1"},
            {"title": "6-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_6_2"},
            {"title": "6-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_6_3"},
            {"title": "6-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_6_4"},
            {"title": "6-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_6_5"},
            {"title": "7-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_7_0"},
            {"title": "7-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_7_1"},
            {"title": "7-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_7_2"},
            {"title": "7-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_7_3"},
            {"title": "7-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_7_4"},
            {"title": "7-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_7_5"},
            {"title": "7-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_7_6"}
        ]
        },
//      {"title": t('markets.draw'), "rows": [
//        {"title": "0-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_0_0"},
//        {"title": "1-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_1_1"},
//        {"title": "2-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_2_2"},
//        {"title": "3-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_3_3"},
//        {"title": "4-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_4_4"},
//        {"title": "5-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_5_5"},
//        {"title": "6-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_6_6"},
//        {"title": "7-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_7_7"}
//      ]},
        {
            "title": "{A}", "rows": [
            {"title": "0-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_0_1"},
            {"title": "0-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_0_2"},
            {"title": "0-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_0_3"},
            {"title": "0-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_0_4"},
            {"title": "0-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_0_5"},
            {"title": "0-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_0_6"},
            {"title": "0-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_0_7"},
            {"title": "1-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_1_2"},
            {"title": "1-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_1_3"},
            {"title": "1-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_1_4"},
            {"title": "1-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_1_5"},
            {"title": "1-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_1_6"},
            {"title": "1-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_1_7"},
            {"title": "2-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_2_3"},
            {"title": "2-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_2_4"},
            {"title": "2-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_2_5"},
            {"title": "2-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_2_6"},
            {"title": "2-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_2_7"},
            {"title": "3-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_3_4"},
            {"title": "3-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_3_5"},
            {"title": "3-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_3_6"},
            {"title": "3-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_3_7"},
            {"title": "4-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_4_5"},
            {"title": "4-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_4_6"},
            {"title": "4-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_4_7"},
            {"title": "5-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_5_6"},
            {"title": "5-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_5_7"},
            {"title": "6-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS1_6_7"}
        ]
        }
    ]
    },
    {
        "name": t('markets.tennis.exact_score_by_set', {set: 2}), "sports": [
        "tennis"
    ], "template": "column_list", "binder": {"set": 2}, "id": 142, "group_id": 10, "dependencies": [
        "coeff_EXACT_SCORE_TENNIS_HTS2_0_0", "coeff_EXACT_SCORE_TENNIS_HTS2_0_1",
        "coeff_EXACT_SCORE_TENNIS_HTS2_0_2",
        "coeff_EXACT_SCORE_TENNIS_HTS2_0_3", "coeff_EXACT_SCORE_TENNIS_HTS2_0_4",
        "coeff_EXACT_SCORE_TENNIS_HTS2_0_5", "coeff_EXACT_SCORE_TENNIS_HTS2_0_6",
        "coeff_EXACT_SCORE_TENNIS_HTS2_0_7", "coeff_EXACT_SCORE_TENNIS_HTS2_1_0",
        "coeff_EXACT_SCORE_TENNIS_HTS2_1_1", "coeff_EXACT_SCORE_TENNIS_HTS2_1_2",
        "coeff_EXACT_SCORE_TENNIS_HTS2_1_3", "coeff_EXACT_SCORE_TENNIS_HTS2_1_4",
        "coeff_EXACT_SCORE_TENNIS_HTS2_1_5", "coeff_EXACT_SCORE_TENNIS_HTS2_1_6",
        "coeff_EXACT_SCORE_TENNIS_HTS2_1_7", "coeff_EXACT_SCORE_TENNIS_HTS2_2_0",
        "coeff_EXACT_SCORE_TENNIS_HTS2_2_1", "coeff_EXACT_SCORE_TENNIS_HTS2_2_2",
        "coeff_EXACT_SCORE_TENNIS_HTS2_2_3", "coeff_EXACT_SCORE_TENNIS_HTS2_2_4",
        "coeff_EXACT_SCORE_TENNIS_HTS2_2_5", "coeff_EXACT_SCORE_TENNIS_HTS2_2_6",
        "coeff_EXACT_SCORE_TENNIS_HTS2_2_7", "coeff_EXACT_SCORE_TENNIS_HTS2_3_0",
        "coeff_EXACT_SCORE_TENNIS_HTS2_3_1", "coeff_EXACT_SCORE_TENNIS_HTS2_3_2",
        "coeff_EXACT_SCORE_TENNIS_HTS2_3_3", "coeff_EXACT_SCORE_TENNIS_HTS2_3_4",
        "coeff_EXACT_SCORE_TENNIS_HTS2_3_5", "coeff_EXACT_SCORE_TENNIS_HTS2_3_6",
        "coeff_EXACT_SCORE_TENNIS_HTS2_3_7", "coeff_EXACT_SCORE_TENNIS_HTS2_4_0",
        "coeff_EXACT_SCORE_TENNIS_HTS2_4_1", "coeff_EXACT_SCORE_TENNIS_HTS2_4_2",
        "coeff_EXACT_SCORE_TENNIS_HTS2_4_3", "coeff_EXACT_SCORE_TENNIS_HTS2_4_4",
        "coeff_EXACT_SCORE_TENNIS_HTS2_4_5", "coeff_EXACT_SCORE_TENNIS_HTS2_4_6",
        "coeff_EXACT_SCORE_TENNIS_HTS2_4_7", "coeff_EXACT_SCORE_TENNIS_HTS2_5_0",
        "coeff_EXACT_SCORE_TENNIS_HTS2_5_1", "coeff_EXACT_SCORE_TENNIS_HTS2_5_2",
        "coeff_EXACT_SCORE_TENNIS_HTS2_5_3", "coeff_EXACT_SCORE_TENNIS_HTS2_5_4",
        "coeff_EXACT_SCORE_TENNIS_HTS2_5_5", "coeff_EXACT_SCORE_TENNIS_HTS2_5_6",
        "coeff_EXACT_SCORE_TENNIS_HTS2_5_7", "coeff_EXACT_SCORE_TENNIS_HTS2_6_0",
        "coeff_EXACT_SCORE_TENNIS_HTS2_6_1", "coeff_EXACT_SCORE_TENNIS_HTS2_6_2",
        "coeff_EXACT_SCORE_TENNIS_HTS2_6_3", "coeff_EXACT_SCORE_TENNIS_HTS2_6_4",
        "coeff_EXACT_SCORE_TENNIS_HTS2_6_5", "coeff_EXACT_SCORE_TENNIS_HTS2_6_6",
        "coeff_EXACT_SCORE_TENNIS_HTS2_6_7", "coeff_EXACT_SCORE_TENNIS_HTS2_7_0",
        "coeff_EXACT_SCORE_TENNIS_HTS2_7_1", "coeff_EXACT_SCORE_TENNIS_HTS2_7_2",
        "coeff_EXACT_SCORE_TENNIS_HTS2_7_3", "coeff_EXACT_SCORE_TENNIS_HTS2_7_4",
        "coeff_EXACT_SCORE_TENNIS_HTS2_7_5", "coeff_EXACT_SCORE_TENNIS_HTS2_7_6",
        "coeff_EXACT_SCORE_TENNIS_HTS2_7_7"
    ], "columns": [
        {
            "title": "{H}", "rows": [
            {"title": "1-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_1_0"},
            {"title": "2-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_2_0"},
            {"title": "2-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_2_1"},
            {"title": "3-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_3_0"},
            {"title": "3-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_3_1"},
            {"title": "3-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_3_2"},
            {"title": "4-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_4_0"},
            {"title": "4-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_4_1"},
            {"title": "4-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_4_2"},
            {"title": "4-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_4_3"},
            {"title": "5-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_5_0"},
            {"title": "5-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_5_1"},
            {"title": "5-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_5_2"},
            {"title": "5-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_5_3"},
            {"title": "5-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_5_4"},
            {"title": "6-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_6_0"},
            {"title": "6-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_6_1"},
            {"title": "6-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_6_2"},
            {"title": "6-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_6_3"},
            {"title": "6-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_6_4"},
            {"title": "6-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_6_5"},
            {"title": "7-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_7_0"},
            {"title": "7-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_7_1"},
            {"title": "7-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_7_2"},
            {"title": "7-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_7_3"},
            {"title": "7-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_7_4"},
            {"title": "7-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_7_5"},
            {"title": "7-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_7_6"}
        ]
        },
//      {"title": t('markets.draw'), "rows": [
//        {"title": "0-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_0_0"},
//        {"title": "1-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_1_1"},
//        {"title": "2-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_2_2"},
//        {"title": "3-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_3_3"},
//        {"title": "4-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_4_4"},
//        {"title": "5-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_5_5"},
//        {"title": "6-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_6_6"},
//        {"title": "7-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_7_7"}
//      ]},
        {
            "title": "{A}", "rows": [
            {"title": "0-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_0_1"},
            {"title": "0-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_0_2"},
            {"title": "0-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_0_3"},
            {"title": "0-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_0_4"},
            {"title": "0-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_0_5"},
            {"title": "0-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_0_6"},
            {"title": "0-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_0_7"},
            {"title": "1-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_1_2"},
            {"title": "1-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_1_3"},
            {"title": "1-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_1_4"},
            {"title": "1-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_1_5"},
            {"title": "1-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_1_6"},
            {"title": "1-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_1_7"},
            {"title": "2-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_2_3"},
            {"title": "2-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_2_4"},
            {"title": "2-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_2_5"},
            {"title": "2-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_2_6"},
            {"title": "2-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_2_7"},
            {"title": "3-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_3_4"},
            {"title": "3-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_3_5"},
            {"title": "3-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_3_6"},
            {"title": "3-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_3_7"},
            {"title": "4-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_4_5"},
            {"title": "4-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_4_6"},
            {"title": "4-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_4_7"},
            {"title": "5-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_5_6"},
            {"title": "5-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_5_7"},
            {"title": "6-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS2_6_7"}
        ]
        }
    ]
    },
    {
        "name": t('markets.tennis.exact_score_by_set', {set: 3}), "sports": [
        "tennis"
    ], "template": "column_list", "binder": {"set": 3}, "id": 143, "group_id": 10, "dependencies": [
        "coeff_EXACT_SCORE_TENNIS_HTS3_0_0", "coeff_EXACT_SCORE_TENNIS_HTS3_0_1",
        "coeff_EXACT_SCORE_TENNIS_HTS3_0_2",
        "coeff_EXACT_SCORE_TENNIS_HTS3_0_3", "coeff_EXACT_SCORE_TENNIS_HTS3_0_4",
        "coeff_EXACT_SCORE_TENNIS_HTS3_0_5", "coeff_EXACT_SCORE_TENNIS_HTS3_0_6",
        "coeff_EXACT_SCORE_TENNIS_HTS3_0_7", "coeff_EXACT_SCORE_TENNIS_HTS3_1_0",
        "coeff_EXACT_SCORE_TENNIS_HTS3_1_1", "coeff_EXACT_SCORE_TENNIS_HTS3_1_2",
        "coeff_EXACT_SCORE_TENNIS_HTS3_1_3", "coeff_EXACT_SCORE_TENNIS_HTS3_1_4",
        "coeff_EXACT_SCORE_TENNIS_HTS3_1_5", "coeff_EXACT_SCORE_TENNIS_HTS3_1_6",
        "coeff_EXACT_SCORE_TENNIS_HTS3_1_7", "coeff_EXACT_SCORE_TENNIS_HTS3_2_0",
        "coeff_EXACT_SCORE_TENNIS_HTS3_2_1", "coeff_EXACT_SCORE_TENNIS_HTS3_2_2",
        "coeff_EXACT_SCORE_TENNIS_HTS3_2_3", "coeff_EXACT_SCORE_TENNIS_HTS3_2_4",
        "coeff_EXACT_SCORE_TENNIS_HTS3_2_5", "coeff_EXACT_SCORE_TENNIS_HTS3_2_6",
        "coeff_EXACT_SCORE_TENNIS_HTS3_2_7", "coeff_EXACT_SCORE_TENNIS_HTS3_3_0",
        "coeff_EXACT_SCORE_TENNIS_HTS3_3_1", "coeff_EXACT_SCORE_TENNIS_HTS3_3_2",
        "coeff_EXACT_SCORE_TENNIS_HTS3_3_3", "coeff_EXACT_SCORE_TENNIS_HTS3_3_4",
        "coeff_EXACT_SCORE_TENNIS_HTS3_3_5", "coeff_EXACT_SCORE_TENNIS_HTS3_3_6",
        "coeff_EXACT_SCORE_TENNIS_HTS3_3_7", "coeff_EXACT_SCORE_TENNIS_HTS3_4_0",
        "coeff_EXACT_SCORE_TENNIS_HTS3_4_1", "coeff_EXACT_SCORE_TENNIS_HTS3_4_2",
        "coeff_EXACT_SCORE_TENNIS_HTS3_4_3", "coeff_EXACT_SCORE_TENNIS_HTS3_4_4",
        "coeff_EXACT_SCORE_TENNIS_HTS3_4_5", "coeff_EXACT_SCORE_TENNIS_HTS3_4_6",
        "coeff_EXACT_SCORE_TENNIS_HTS3_4_7", "coeff_EXACT_SCORE_TENNIS_HTS3_5_0",
        "coeff_EXACT_SCORE_TENNIS_HTS3_5_1", "coeff_EXACT_SCORE_TENNIS_HTS3_5_2",
        "coeff_EXACT_SCORE_TENNIS_HTS3_5_3", "coeff_EXACT_SCORE_TENNIS_HTS3_5_4",
        "coeff_EXACT_SCORE_TENNIS_HTS3_5_5", "coeff_EXACT_SCORE_TENNIS_HTS3_5_6",
        "coeff_EXACT_SCORE_TENNIS_HTS3_5_7", "coeff_EXACT_SCORE_TENNIS_HTS3_6_0",
        "coeff_EXACT_SCORE_TENNIS_HTS3_6_1", "coeff_EXACT_SCORE_TENNIS_HTS3_6_2",
        "coeff_EXACT_SCORE_TENNIS_HTS3_6_3", "coeff_EXACT_SCORE_TENNIS_HTS3_6_4",
        "coeff_EXACT_SCORE_TENNIS_HTS3_6_5", "coeff_EXACT_SCORE_TENNIS_HTS3_6_6",
        "coeff_EXACT_SCORE_TENNIS_HTS3_6_7", "coeff_EXACT_SCORE_TENNIS_HTS3_7_0",
        "coeff_EXACT_SCORE_TENNIS_HTS3_7_1", "coeff_EXACT_SCORE_TENNIS_HTS3_7_2",
        "coeff_EXACT_SCORE_TENNIS_HTS3_7_3", "coeff_EXACT_SCORE_TENNIS_HTS3_7_4",
        "coeff_EXACT_SCORE_TENNIS_HTS3_7_5", "coeff_EXACT_SCORE_TENNIS_HTS3_7_6",
        "coeff_EXACT_SCORE_TENNIS_HTS3_7_7"
    ], "columns": [
        {
            "title": "{H}", "rows": [
            {"title": "1-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_1_0"},
            {"title": "2-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_2_0"},
            {"title": "2-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_2_1"},
            {"title": "3-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_3_0"},
            {"title": "3-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_3_1"},
            {"title": "3-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_3_2"},
            {"title": "4-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_4_0"},
            {"title": "4-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_4_1"},
            {"title": "4-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_4_2"},
            {"title": "4-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_4_3"},
            {"title": "5-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_5_0"},
            {"title": "5-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_5_1"},
            {"title": "5-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_5_2"},
            {"title": "5-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_5_3"},
            {"title": "5-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_5_4"},
            {"title": "6-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_6_0"},
            {"title": "6-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_6_1"},
            {"title": "6-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_6_2"},
            {"title": "6-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_6_3"},
            {"title": "6-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_6_4"},
            {"title": "6-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_6_5"},
            {"title": "7-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_7_0"},
            {"title": "7-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_7_1"},
            {"title": "7-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_7_2"},
            {"title": "7-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_7_3"},
            {"title": "7-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_7_4"},
            {"title": "7-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_7_5"},
            {"title": "7-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_7_6"}
        ]
        },
//      {"title": t('markets.draw'), "rows": [
//        {"title": "0-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_0_0"},
//        {"title": "1-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_1_1"},
//        {"title": "2-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_2_2"},
//        {"title": "3-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_3_3"},
//        {"title": "4-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_4_4"},
//        {"title": "5-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_5_5"},
//        {"title": "6-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_6_6"},
//        {"title": "7-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_7_7"}
//      ]},
        {
            "title": "{A}", "rows": [
            {"title": "0-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_0_1"},
            {"title": "0-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_0_2"},
            {"title": "0-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_0_3"},
            {"title": "0-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_0_4"},
            {"title": "0-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_0_5"},
            {"title": "0-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_0_6"},
            {"title": "0-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_0_7"},
            {"title": "1-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_1_2"},
            {"title": "1-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_1_3"},
            {"title": "1-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_1_4"},
            {"title": "1-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_1_5"},
            {"title": "1-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_1_6"},
            {"title": "1-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_1_7"},
            {"title": "2-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_2_3"},
            {"title": "2-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_2_4"},
            {"title": "2-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_2_5"},
            {"title": "2-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_2_6"},
            {"title": "2-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_2_7"},
            {"title": "3-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_3_4"},
            {"title": "3-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_3_5"},
            {"title": "3-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_3_6"},
            {"title": "3-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_3_7"},
            {"title": "4-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_4_5"},
            {"title": "4-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_4_6"},
            {"title": "4-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_4_7"},
            {"title": "5-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_5_6"},
            {"title": "5-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_5_7"},
            {"title": "6-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS3_6_7"}
        ]
        }
    ]
    },
    {
        "name": t('markets.tennis.exact_score_by_set', {set: 4}), "sports": [
        "tennis"
    ], "template": "column_list", "binder": {"set": 4}, "id": 144, "group_id": 10, "dependencies": [
        "coeff_EXACT_SCORE_TENNIS_HTS4_0_0", "coeff_EXACT_SCORE_TENNIS_HTS4_0_1",
        "coeff_EXACT_SCORE_TENNIS_HTS4_0_2",
        "coeff_EXACT_SCORE_TENNIS_HTS4_0_3", "coeff_EXACT_SCORE_TENNIS_HTS4_0_4",
        "coeff_EXACT_SCORE_TENNIS_HTS4_0_5", "coeff_EXACT_SCORE_TENNIS_HTS4_0_6",
        "coeff_EXACT_SCORE_TENNIS_HTS4_0_7", "coeff_EXACT_SCORE_TENNIS_HTS4_1_0",
        "coeff_EXACT_SCORE_TENNIS_HTS4_1_1", "coeff_EXACT_SCORE_TENNIS_HTS4_1_2",
        "coeff_EXACT_SCORE_TENNIS_HTS4_1_3", "coeff_EXACT_SCORE_TENNIS_HTS4_1_4",
        "coeff_EXACT_SCORE_TENNIS_HTS4_1_5", "coeff_EXACT_SCORE_TENNIS_HTS4_1_6",
        "coeff_EXACT_SCORE_TENNIS_HTS4_1_7", "coeff_EXACT_SCORE_TENNIS_HTS4_2_0",
        "coeff_EXACT_SCORE_TENNIS_HTS4_2_1", "coeff_EXACT_SCORE_TENNIS_HTS4_2_2",
        "coeff_EXACT_SCORE_TENNIS_HTS4_2_3", "coeff_EXACT_SCORE_TENNIS_HTS4_2_4",
        "coeff_EXACT_SCORE_TENNIS_HTS4_2_5", "coeff_EXACT_SCORE_TENNIS_HTS4_2_6",
        "coeff_EXACT_SCORE_TENNIS_HTS4_2_7", "coeff_EXACT_SCORE_TENNIS_HTS4_3_0",
        "coeff_EXACT_SCORE_TENNIS_HTS4_3_1", "coeff_EXACT_SCORE_TENNIS_HTS4_3_2",
        "coeff_EXACT_SCORE_TENNIS_HTS4_3_3", "coeff_EXACT_SCORE_TENNIS_HTS4_3_4",
        "coeff_EXACT_SCORE_TENNIS_HTS4_3_5", "coeff_EXACT_SCORE_TENNIS_HTS4_3_6",
        "coeff_EXACT_SCORE_TENNIS_HTS4_3_7", "coeff_EXACT_SCORE_TENNIS_HTS4_4_0",
        "coeff_EXACT_SCORE_TENNIS_HTS4_4_1", "coeff_EXACT_SCORE_TENNIS_HTS4_4_2",
        "coeff_EXACT_SCORE_TENNIS_HTS4_4_3", "coeff_EXACT_SCORE_TENNIS_HTS4_4_4",
        "coeff_EXACT_SCORE_TENNIS_HTS4_4_5", "coeff_EXACT_SCORE_TENNIS_HTS4_4_6",
        "coeff_EXACT_SCORE_TENNIS_HTS4_4_7", "coeff_EXACT_SCORE_TENNIS_HTS4_5_0",
        "coeff_EXACT_SCORE_TENNIS_HTS4_5_1", "coeff_EXACT_SCORE_TENNIS_HTS4_5_2",
        "coeff_EXACT_SCORE_TENNIS_HTS4_5_3", "coeff_EXACT_SCORE_TENNIS_HTS4_5_4",
        "coeff_EXACT_SCORE_TENNIS_HTS4_5_5", "coeff_EXACT_SCORE_TENNIS_HTS4_5_6",
        "coeff_EXACT_SCORE_TENNIS_HTS4_5_7", "coeff_EXACT_SCORE_TENNIS_HTS4_6_0",
        "coeff_EXACT_SCORE_TENNIS_HTS4_6_1", "coeff_EXACT_SCORE_TENNIS_HTS4_6_2",
        "coeff_EXACT_SCORE_TENNIS_HTS4_6_3", "coeff_EXACT_SCORE_TENNIS_HTS4_6_4",
        "coeff_EXACT_SCORE_TENNIS_HTS4_6_5", "coeff_EXACT_SCORE_TENNIS_HTS4_6_6",
        "coeff_EXACT_SCORE_TENNIS_HTS4_6_7", "coeff_EXACT_SCORE_TENNIS_HTS4_7_0",
        "coeff_EXACT_SCORE_TENNIS_HTS4_7_1", "coeff_EXACT_SCORE_TENNIS_HTS4_7_2",
        "coeff_EXACT_SCORE_TENNIS_HTS4_7_3", "coeff_EXACT_SCORE_TENNIS_HTS4_7_4",
        "coeff_EXACT_SCORE_TENNIS_HTS4_7_5", "coeff_EXACT_SCORE_TENNIS_HTS4_7_6",
        "coeff_EXACT_SCORE_TENNIS_HTS4_7_7"
    ], "columns": [
        {
            "title": "{H}", "rows": [
            {"title": "1-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_1_0"},
            {"title": "2-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_2_0"},
            {"title": "2-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_2_1"},
            {"title": "3-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_3_0"},
            {"title": "3-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_3_1"},
            {"title": "3-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_3_2"},
            {"title": "4-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_4_0"},
            {"title": "4-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_4_1"},
            {"title": "4-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_4_2"},
            {"title": "4-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_4_3"},
            {"title": "5-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_5_0"},
            {"title": "5-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_5_1"},
            {"title": "5-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_5_2"},
            {"title": "5-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_5_3"},
            {"title": "5-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_5_4"},
            {"title": "6-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_6_0"},
            {"title": "6-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_6_1"},
            {"title": "6-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_6_2"},
            {"title": "6-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_6_3"},
            {"title": "6-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_6_4"},
            {"title": "6-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_6_5"},
            {"title": "7-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_7_0"},
            {"title": "7-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_7_1"},
            {"title": "7-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_7_2"},
            {"title": "7-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_7_3"},
            {"title": "7-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_7_4"},
            {"title": "7-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_7_5"},
            {"title": "7-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_7_6"}
        ]
        },
//      {"title": t('markets.draw'), "rows": [
//        {"title": "0-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_0_0"},
//        {"title": "1-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_1_1"},
//        {"title": "2-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_2_2"},
//        {"title": "3-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_3_3"},
//        {"title": "4-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_4_4"},
//        {"title": "5-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_5_5"},
//        {"title": "6-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_6_6"},
//        {"title": "7-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_7_7"}
//      ]},
        {
            "title": "{A}", "rows": [
            {"title": "0-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_0_1"},
            {"title": "0-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_0_2"},
            {"title": "0-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_0_3"},
            {"title": "0-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_0_4"},
            {"title": "0-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_0_5"},
            {"title": "0-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_0_6"},
            {"title": "0-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_0_7"},
            {"title": "1-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_1_2"},
            {"title": "1-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_1_3"},
            {"title": "1-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_1_4"},
            {"title": "1-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_1_5"},
            {"title": "1-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_1_6"},
            {"title": "1-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_1_7"},
            {"title": "2-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_2_3"},
            {"title": "2-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_2_4"},
            {"title": "2-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_2_5"},
            {"title": "2-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_2_6"},
            {"title": "2-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_2_7"},
            {"title": "3-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_3_4"},
            {"title": "3-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_3_5"},
            {"title": "3-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_3_6"},
            {"title": "3-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_3_7"},
            {"title": "4-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_4_5"},
            {"title": "4-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_4_6"},
            {"title": "4-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_4_7"},
            {"title": "5-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_5_6"},
            {"title": "5-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_5_7"},
            {"title": "6-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS4_6_7"}
        ]
        }
    ]
    },
    {
        "name": t('markets.tennis.exact_score_by_set', {set: 5}), "sports": [
        "tennis"
    ], "template": "column_list", "binder": {"set": 5}, "id": 145, "group_id": 10, "dependencies": [
        "coeff_EXACT_SCORE_TENNIS_HTS5_0_0", "coeff_EXACT_SCORE_TENNIS_HTS5_0_1",
        "coeff_EXACT_SCORE_TENNIS_HTS5_0_2",
        "coeff_EXACT_SCORE_TENNIS_HTS5_0_3", "coeff_EXACT_SCORE_TENNIS_HTS5_0_4",
        "coeff_EXACT_SCORE_TENNIS_HTS5_0_5", "coeff_EXACT_SCORE_TENNIS_HTS5_0_6",
        "coeff_EXACT_SCORE_TENNIS_HTS5_0_7", "coeff_EXACT_SCORE_TENNIS_HTS5_1_0",
        "coeff_EXACT_SCORE_TENNIS_HTS5_1_1", "coeff_EXACT_SCORE_TENNIS_HTS5_1_2",
        "coeff_EXACT_SCORE_TENNIS_HTS5_1_3", "coeff_EXACT_SCORE_TENNIS_HTS5_1_4",
        "coeff_EXACT_SCORE_TENNIS_HTS5_1_5", "coeff_EXACT_SCORE_TENNIS_HTS5_1_6",
        "coeff_EXACT_SCORE_TENNIS_HTS5_1_7", "coeff_EXACT_SCORE_TENNIS_HTS5_2_0",
        "coeff_EXACT_SCORE_TENNIS_HTS5_2_1", "coeff_EXACT_SCORE_TENNIS_HTS5_2_2",
        "coeff_EXACT_SCORE_TENNIS_HTS5_2_3", "coeff_EXACT_SCORE_TENNIS_HTS5_2_4",
        "coeff_EXACT_SCORE_TENNIS_HTS5_2_5", "coeff_EXACT_SCORE_TENNIS_HTS5_2_6",
        "coeff_EXACT_SCORE_TENNIS_HTS5_2_7", "coeff_EXACT_SCORE_TENNIS_HTS5_3_0",
        "coeff_EXACT_SCORE_TENNIS_HTS5_3_1", "coeff_EXACT_SCORE_TENNIS_HTS5_3_2",
        "coeff_EXACT_SCORE_TENNIS_HTS5_3_3", "coeff_EXACT_SCORE_TENNIS_HTS5_3_4",
        "coeff_EXACT_SCORE_TENNIS_HTS5_3_5", "coeff_EXACT_SCORE_TENNIS_HTS5_3_6",
        "coeff_EXACT_SCORE_TENNIS_HTS5_3_7", "coeff_EXACT_SCORE_TENNIS_HTS5_4_0",
        "coeff_EXACT_SCORE_TENNIS_HTS5_4_1", "coeff_EXACT_SCORE_TENNIS_HTS5_4_2",
        "coeff_EXACT_SCORE_TENNIS_HTS5_4_3", "coeff_EXACT_SCORE_TENNIS_HTS5_4_4",
        "coeff_EXACT_SCORE_TENNIS_HTS5_4_5", "coeff_EXACT_SCORE_TENNIS_HTS5_4_6",
        "coeff_EXACT_SCORE_TENNIS_HTS5_4_7", "coeff_EXACT_SCORE_TENNIS_HTS5_5_0",
        "coeff_EXACT_SCORE_TENNIS_HTS5_5_1", "coeff_EXACT_SCORE_TENNIS_HTS5_5_2",
        "coeff_EXACT_SCORE_TENNIS_HTS5_5_3", "coeff_EXACT_SCORE_TENNIS_HTS5_5_4",
        "coeff_EXACT_SCORE_TENNIS_HTS5_5_5", "coeff_EXACT_SCORE_TENNIS_HTS5_5_6",
        "coeff_EXACT_SCORE_TENNIS_HTS5_5_7", "coeff_EXACT_SCORE_TENNIS_HTS5_6_0",
        "coeff_EXACT_SCORE_TENNIS_HTS5_6_1", "coeff_EXACT_SCORE_TENNIS_HTS5_6_2",
        "coeff_EXACT_SCORE_TENNIS_HTS5_6_3", "coeff_EXACT_SCORE_TENNIS_HTS5_6_4",
        "coeff_EXACT_SCORE_TENNIS_HTS5_6_5", "coeff_EXACT_SCORE_TENNIS_HTS5_6_6",
        "coeff_EXACT_SCORE_TENNIS_HTS5_6_7", "coeff_EXACT_SCORE_TENNIS_HTS5_7_0",
        "coeff_EXACT_SCORE_TENNIS_HTS5_7_1", "coeff_EXACT_SCORE_TENNIS_HTS5_7_2",
        "coeff_EXACT_SCORE_TENNIS_HTS5_7_3", "coeff_EXACT_SCORE_TENNIS_HTS5_7_4",
        "coeff_EXACT_SCORE_TENNIS_HTS5_7_5", "coeff_EXACT_SCORE_TENNIS_HTS5_7_6",
        "coeff_EXACT_SCORE_TENNIS_HTS5_7_7"
    ], "columns": [
        {
            "title": "{H}", "rows": [
            {"title": "1-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_1_0"},
            {"title": "2-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_2_0"},
            {"title": "2-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_2_1"},
            {"title": "3-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_3_0"},
            {"title": "3-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_3_1"},
            {"title": "3-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_3_2"},
            {"title": "4-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_4_0"},
            {"title": "4-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_4_1"},
            {"title": "4-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_4_2"},
            {"title": "4-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_4_3"},
            {"title": "5-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_5_0"},
            {"title": "5-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_5_1"},
            {"title": "5-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_5_2"},
            {"title": "5-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_5_3"},
            {"title": "5-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_5_4"},
            {"title": "6-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_6_0"},
            {"title": "6-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_6_1"},
            {"title": "6-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_6_2"},
            {"title": "6-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_6_3"},
            {"title": "6-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_6_4"},
            {"title": "6-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_6_5"},
            {"title": "7-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_7_0"},
            {"title": "7-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_7_1"},
            {"title": "7-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_7_2"},
            {"title": "7-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_7_3"},
            {"title": "7-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_7_4"},
            {"title": "7-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_7_5"},
            {"title": "7-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_7_6"}
        ]
        },
//      {"title": t('markets.draw'), "rows": [
//        {"title": "0-0", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_0_0"},
//        {"title": "1-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_1_1"},
//        {"title": "2-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_2_2"},
//        {"title": "3-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_3_3"},
//        {"title": "4-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_4_4"},
//        {"title": "5-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_5_5"},
//        {"title": "6-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_6_6"},
//        {"title": "7-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_7_7"}
//      ]},
        {
            "title": "{A}", "rows": [
            {"title": "0-1", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_0_1"},
            {"title": "0-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_0_2"},
            {"title": "0-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_0_3"},
            {"title": "0-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_0_4"},
            {"title": "0-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_0_5"},
            {"title": "0-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_0_6"},
            {"title": "0-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_0_7"},
            {"title": "1-2", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_1_2"},
            {"title": "1-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_1_3"},
            {"title": "1-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_1_4"},
            {"title": "1-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_1_5"},
            {"title": "1-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_1_6"},
            {"title": "1-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_1_7"},
            {"title": "2-3", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_2_3"},
            {"title": "2-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_2_4"},
            {"title": "2-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_2_5"},
            {"title": "2-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_2_6"},
            {"title": "2-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_2_7"},
            {"title": "3-4", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_3_4"},
            {"title": "3-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_3_5"},
            {"title": "3-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_3_6"},
            {"title": "3-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_3_7"},
            {"title": "4-5", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_4_5"},
            {"title": "4-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_4_6"},
            {"title": "4-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_4_7"},
            {"title": "5-6", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_5_6"},
            {"title": "5-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_5_7"},
            {"title": "6-7", "name": "coeff_EXACT_SCORE_TENNIS_HTS5_6_7"}
        ]
        }
    ]
    },
    {
        "name": {
            "default": t('markets.fora.set', {part: 1}),
            "volleyball": t('markets.fora.part', {part: 1}),
            "table_tennis": t('markets.fora.part', {part: 1}),
            "beach_volleyball": t('markets.fora.part', {part: 1})
        }, "template": "fora", "sports": [
        "volleyball", "beach_volleyball", "tennis", "table_tennis", "badminton"
    ], "id": 146, "group_id": 10, "dependencies": [
        "coeff_ODDS_HTS1_0ODDS", "coeff_ODDS_HTS1_0ODDS_A",
        "coeff_ODDS_HTS1_0ODDS_H", "coeff_ODDS_HTS1_1ODDS", "coeff_ODDS_HTS1_1ODDS_A", "coeff_ODDS_HTS1_1ODDS_H",
        "coeff_ODDS_HTS1_2ODDS", "coeff_ODDS_HTS1_2ODDS_A", "coeff_ODDS_HTS1_2ODDS_H", "coeff_ODDS_HTS1_3ODDS",
        "coeff_ODDS_HTS1_3ODDS_A", "coeff_ODDS_HTS1_3ODDS_H", "coeff_ODDS_HTS1_4ODDS", "coeff_ODDS_HTS1_4ODDS_A",
        "coeff_ODDS_HTS1_4ODDS_H", "coeff_ODDS_HTS1_5ODDS", "coeff_ODDS_HTS1_5ODDS_A", "coeff_ODDS_HTS1_5ODDS_H",
        "coeff_ODDS_HTS1_6ODDS", "coeff_ODDS_HTS1_6ODDS_A", "coeff_ODDS_HTS1_6ODDS_H", "coeff_ODDS_HTS1_7ODDS",
        "coeff_ODDS_HTS1_7ODDS_A", "coeff_ODDS_HTS1_7ODDS_H", "coeff_ODDS_HTS1_8ODDS", "coeff_ODDS_HTS1_8ODDS_A",
        "coeff_ODDS_HTS1_8ODDS_H", "coeff_ODDS_HTS1_9ODDS", "coeff_ODDS_HTS1_9ODDS_A", "coeff_ODDS_HTS1_9ODDS_H"
    ], "bases": [
        "coeff_ODDS_HTS1_0ODDS", "coeff_ODDS_HTS1_1ODDS", "coeff_ODDS_HTS1_2ODDS", "coeff_ODDS_HTS1_3ODDS",
        "coeff_ODDS_HTS1_4ODDS", "coeff_ODDS_HTS1_5ODDS", "coeff_ODDS_HTS1_6ODDS", "coeff_ODDS_HTS1_7ODDS",
        "coeff_ODDS_HTS1_8ODDS", "coeff_ODDS_HTS1_9ODDS"
    ]
    },
    {
        "name": {
            "default": t('markets.fora.set', {part: 2}),
            "volleyball": t('markets.fora.part', {part: 2}),
            "table_tennis": t('markets.fora.part', {part: 2}),
            "beach_volleyball": t('markets.fora.part', {part: 2})
        }, "template": "fora", "sports": [
        "volleyball", "beach_volleyball", "tennis", "table_tennis", "badminton"
    ], "id": 147, "group_id": 10, "dependencies": [
        "coeff_ODDS_HTS2_0ODDS", "coeff_ODDS_HTS2_0ODDS_A",
        "coeff_ODDS_HTS2_0ODDS_H", "coeff_ODDS_HTS2_1ODDS", "coeff_ODDS_HTS2_1ODDS_A", "coeff_ODDS_HTS2_1ODDS_H",
        "coeff_ODDS_HTS2_2ODDS", "coeff_ODDS_HTS2_2ODDS_A", "coeff_ODDS_HTS2_2ODDS_H", "coeff_ODDS_HTS2_3ODDS",
        "coeff_ODDS_HTS2_3ODDS_A", "coeff_ODDS_HTS2_3ODDS_H", "coeff_ODDS_HTS2_4ODDS", "coeff_ODDS_HTS2_4ODDS_A",
        "coeff_ODDS_HTS2_4ODDS_H", "coeff_ODDS_HTS2_5ODDS", "coeff_ODDS_HTS2_5ODDS_A", "coeff_ODDS_HTS2_5ODDS_H",
        "coeff_ODDS_HTS2_6ODDS", "coeff_ODDS_HTS2_6ODDS_A", "coeff_ODDS_HTS2_6ODDS_H", "coeff_ODDS_HTS2_7ODDS",
        "coeff_ODDS_HTS2_7ODDS_A", "coeff_ODDS_HTS2_7ODDS_H", "coeff_ODDS_HTS2_8ODDS", "coeff_ODDS_HTS2_8ODDS_A",
        "coeff_ODDS_HTS2_8ODDS_H", "coeff_ODDS_HTS2_9ODDS", "coeff_ODDS_HTS2_9ODDS_A", "coeff_ODDS_HTS2_9ODDS_H"
    ], "bases": [
        "coeff_ODDS_HTS2_0ODDS", "coeff_ODDS_HTS2_1ODDS", "coeff_ODDS_HTS2_2ODDS", "coeff_ODDS_HTS2_3ODDS",
        "coeff_ODDS_HTS2_4ODDS", "coeff_ODDS_HTS2_5ODDS", "coeff_ODDS_HTS2_6ODDS", "coeff_ODDS_HTS2_7ODDS",
        "coeff_ODDS_HTS2_8ODDS", "coeff_ODDS_HTS2_9ODDS"
    ]
    },
    {
        "name": {
            "default": t('markets.fora.set', {part: 3}),
            "volleyball": t('markets.fora.part', {part: 3}),
            "table_tennis": t('markets.fora.part', {part: 3}),
            "beach_volleyball": t('markets.fora.part', {part: 3})
        }, "template": "fora", "sports": [
        "volleyball", "beach_volleyball", "tennis", "table_tennis", "badminton"
    ], "id": 148, "group_id": 10, "dependencies": [
        "coeff_ODDS_HTS3_0ODDS", "coeff_ODDS_HTS3_0ODDS_A",
        "coeff_ODDS_HTS3_0ODDS_H", "coeff_ODDS_HTS3_1ODDS", "coeff_ODDS_HTS3_1ODDS_A", "coeff_ODDS_HTS3_1ODDS_H",
        "coeff_ODDS_HTS3_2ODDS", "coeff_ODDS_HTS3_2ODDS_A", "coeff_ODDS_HTS3_2ODDS_H", "coeff_ODDS_HTS3_3ODDS",
        "coeff_ODDS_HTS3_3ODDS_A", "coeff_ODDS_HTS3_3ODDS_H", "coeff_ODDS_HTS3_4ODDS", "coeff_ODDS_HTS3_4ODDS_A",
        "coeff_ODDS_HTS3_4ODDS_H", "coeff_ODDS_HTS3_5ODDS", "coeff_ODDS_HTS3_5ODDS_A", "coeff_ODDS_HTS3_5ODDS_H",
        "coeff_ODDS_HTS3_6ODDS", "coeff_ODDS_HTS3_6ODDS_A", "coeff_ODDS_HTS3_6ODDS_H", "coeff_ODDS_HTS3_7ODDS",
        "coeff_ODDS_HTS3_7ODDS_A", "coeff_ODDS_HTS3_7ODDS_H", "coeff_ODDS_HTS3_8ODDS", "coeff_ODDS_HTS3_8ODDS_A",
        "coeff_ODDS_HTS3_8ODDS_H", "coeff_ODDS_HTS3_9ODDS", "coeff_ODDS_HTS3_9ODDS_A", "coeff_ODDS_HTS3_9ODDS_H"
    ], "bases": [
        "coeff_ODDS_HTS3_0ODDS", "coeff_ODDS_HTS3_1ODDS", "coeff_ODDS_HTS3_2ODDS", "coeff_ODDS_HTS3_3ODDS",
        "coeff_ODDS_HTS3_4ODDS", "coeff_ODDS_HTS3_5ODDS", "coeff_ODDS_HTS3_6ODDS", "coeff_ODDS_HTS3_7ODDS",
        "coeff_ODDS_HTS3_8ODDS", "coeff_ODDS_HTS3_9ODDS"
    ]
    },
    {
        "name": t('markets.fora.part_', {part: 4}),
        "template": "fora",
        "sports": ["volleyball", "beach_volleyball", "table_tennis", "badminton"],
        "id": 149,
        "group_id": 10,
        "dependencies": [
            "coeff_ODDS_HTS4_0ODDS", "coeff_ODDS_HTS4_0ODDS_A", "coeff_ODDS_HTS4_0ODDS_H", "coeff_ODDS_HTS4_1ODDS",
            "coeff_ODDS_HTS4_1ODDS_A", "coeff_ODDS_HTS4_1ODDS_H", "coeff_ODDS_HTS4_2ODDS", "coeff_ODDS_HTS4_2ODDS_A",
            "coeff_ODDS_HTS4_2ODDS_H", "coeff_ODDS_HTS4_3ODDS", "coeff_ODDS_HTS4_3ODDS_A", "coeff_ODDS_HTS4_3ODDS_H",
            "coeff_ODDS_HTS4_4ODDS", "coeff_ODDS_HTS4_4ODDS_A", "coeff_ODDS_HTS4_4ODDS_H", "coeff_ODDS_HTS4_5ODDS",
            "coeff_ODDS_HTS4_5ODDS_A", "coeff_ODDS_HTS4_5ODDS_H", "coeff_ODDS_HTS4_6ODDS", "coeff_ODDS_HTS4_6ODDS_A",
            "coeff_ODDS_HTS4_6ODDS_H", "coeff_ODDS_HTS4_7ODDS", "coeff_ODDS_HTS4_7ODDS_A", "coeff_ODDS_HTS4_7ODDS_H",
            "coeff_ODDS_HTS4_8ODDS", "coeff_ODDS_HTS4_8ODDS_A", "coeff_ODDS_HTS4_8ODDS_H", "coeff_ODDS_HTS4_9ODDS",
            "coeff_ODDS_HTS4_9ODDS_A", "coeff_ODDS_HTS4_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HTS4_0ODDS", "coeff_ODDS_HTS4_1ODDS", "coeff_ODDS_HTS4_2ODDS", "coeff_ODDS_HTS4_3ODDS",
            "coeff_ODDS_HTS4_4ODDS", "coeff_ODDS_HTS4_5ODDS", "coeff_ODDS_HTS4_6ODDS", "coeff_ODDS_HTS4_7ODDS",
            "coeff_ODDS_HTS4_8ODDS", "coeff_ODDS_HTS4_9ODDS"
        ]
    },
    {
        "name": t('markets.fora.part_', {part: 5}),
        "template": "fora",
        "sports": ["volleyball", "beach_volleyball", "table_tennis", "badminton"],
        "id": 150,
        "group_id": 10,
        "dependencies": [
            "coeff_ODDS_HTS5_0ODDS", "coeff_ODDS_HTS5_0ODDS_A", "coeff_ODDS_HTS5_0ODDS_H", "coeff_ODDS_HTS5_1ODDS",
            "coeff_ODDS_HTS5_1ODDS_A", "coeff_ODDS_HTS5_1ODDS_H", "coeff_ODDS_HTS5_2ODDS", "coeff_ODDS_HTS5_2ODDS_A",
            "coeff_ODDS_HTS5_2ODDS_H", "coeff_ODDS_HTS5_3ODDS", "coeff_ODDS_HTS5_3ODDS_A", "coeff_ODDS_HTS5_3ODDS_H",
            "coeff_ODDS_HTS5_4ODDS", "coeff_ODDS_HTS5_4ODDS_A", "coeff_ODDS_HTS5_4ODDS_H", "coeff_ODDS_HTS5_5ODDS",
            "coeff_ODDS_HTS5_5ODDS_A", "coeff_ODDS_HTS5_5ODDS_H", "coeff_ODDS_HTS5_6ODDS", "coeff_ODDS_HTS5_6ODDS_A",
            "coeff_ODDS_HTS5_6ODDS_H", "coeff_ODDS_HTS5_7ODDS", "coeff_ODDS_HTS5_7ODDS_A", "coeff_ODDS_HTS5_7ODDS_H",
            "coeff_ODDS_HTS5_8ODDS", "coeff_ODDS_HTS5_8ODDS_A", "coeff_ODDS_HTS5_8ODDS_H", "coeff_ODDS_HTS5_9ODDS",
            "coeff_ODDS_HTS5_9ODDS_A", "coeff_ODDS_HTS5_9ODDS_H"
        ],
        "bases": [
            "coeff_ODDS_HTS5_0ODDS", "coeff_ODDS_HTS5_1ODDS", "coeff_ODDS_HTS5_2ODDS", "coeff_ODDS_HTS5_3ODDS",
            "coeff_ODDS_HTS5_4ODDS", "coeff_ODDS_HTS5_5ODDS", "coeff_ODDS_HTS5_6ODDS", "coeff_ODDS_HTS5_7ODDS",
            "coeff_ODDS_HTS5_8ODDS", "coeff_ODDS_HTS5_9ODDS"
        ]
    },
    {
        "name": {
            "default": t('markets.totals.games_', {part: 1}),
            "volleyball": t('markets.totals.goals_part', {part: 1}),
            "table_tennis": t('markets.totals.goals_part', {part: 1}),
            "beach_volleyball": t('markets.totals.goals_part', {part: 1})
        }, "sports": [
        "volleyball", "beach_volleyball", "tennis", "table_tennis", "badminton"
    ], "template": "total", "id": 151, "group_id": 10, "dependencies": [
        "coeff_HTS1_TOTAL_0_T", "coeff_HTS1_TOTAL_0_TL", "coeff_HTS1_TOTAL_0_TG", "coeff_HTS1_T", "coeff_HTS1_TL",
        "coeff_HTS1_TG", "coeff_HTS1_TOTAL_1_T", "coeff_HTS1_TOTAL_1_TL", "coeff_HTS1_TOTAL_1_TG",
        "coeff_HTS1_TOTAL_2_T", "coeff_HTS1_TOTAL_2_TL", "coeff_HTS1_TOTAL_2_TG", "coeff_HTS1_TOTAL_3_T",
        "coeff_HTS1_TOTAL_3_TL", "coeff_HTS1_TOTAL_3_TG", "coeff_HTS1_TOTAL_4_T", "coeff_HTS1_TOTAL_4_TL",
        "coeff_HTS1_TOTAL_4_TG", "coeff_HTS1_TOTAL_5_T", "coeff_HTS1_TOTAL_5_TL", "coeff_HTS1_TOTAL_5_TG",
        "coeff_HTS1_TOTAL_6_T", "coeff_HTS1_TOTAL_6_TL", "coeff_HTS1_TOTAL_6_TG", "coeff_HTS1_TOTAL_7_T",
        "coeff_HTS1_TOTAL_7_TL", "coeff_HTS1_TOTAL_7_TG", "coeff_HTS1_TOTAL_8_T", "coeff_HTS1_TOTAL_8_TL",
        "coeff_HTS1_TOTAL_8_TG", "coeff_HTS1_TOTAL_9_T", "coeff_HTS1_TOTAL_9_TL", "coeff_HTS1_TOTAL_9_TG",
        "coeff_HTS1_Odd", "coeff_HTS1_Even"
    ], "bases": [
        "coeff_HTS1_TOTAL_0_T", "coeff_HTS1_T", "coeff_HTS1_TOTAL_1_T", "coeff_HTS1_TOTAL_2_T",
        "coeff_HTS1_TOTAL_3_T", "coeff_HTS1_TOTAL_4_T", "coeff_HTS1_TOTAL_5_T", "coeff_HTS1_TOTAL_6_T",
        "coeff_HTS1_TOTAL_7_T", "coeff_HTS1_TOTAL_8_T", "coeff_HTS1_TOTAL_9_T"
    ], "odd": "coeff_HTS1_"
    },
    {
        "name": t('markets.totals.points_part_', {team: '{H}', part: 1}), "sports": [
        "volleyball"
    ], "template": "total", "id": 152, "group_id": 10, "dependencies": [
        "coeff_HTS1_HOME_TOTAL_0_T", "coeff_HTS1_HOME_TOTAL_0_TL", "coeff_HTS1_HOME_TOTAL_0_TG",
        "coeff_HTS1_HOME_T",
        "coeff_HTS1_HOME_TL", "coeff_HTS1_HOME_TG", "coeff_HTS1_HOME_TOTAL_1_T", "coeff_HTS1_HOME_TOTAL_1_TL",
        "coeff_HTS1_HOME_TOTAL_1_TG", "coeff_HTS1_HOME_TOTAL_2_T", "coeff_HTS1_HOME_TOTAL_2_TL",
        "coeff_HTS1_HOME_TOTAL_2_TG", "coeff_HTS1_HOME_TOTAL_3_T", "coeff_HTS1_HOME_TOTAL_3_TL",
        "coeff_HTS1_HOME_TOTAL_3_TG", "coeff_HTS1_HOME_TOTAL_4_T", "coeff_HTS1_HOME_TOTAL_4_TL",
        "coeff_HTS1_HOME_TOTAL_4_TG", "coeff_HTS1_HOME_TOTAL_5_T", "coeff_HTS1_HOME_TOTAL_5_TL",
        "coeff_HTS1_HOME_TOTAL_5_TG", "coeff_HTS1_HOME_TOTAL_6_T", "coeff_HTS1_HOME_TOTAL_6_TL",
        "coeff_HTS1_HOME_TOTAL_6_TG", "coeff_HTS1_HOME_TOTAL_7_T", "coeff_HTS1_HOME_TOTAL_7_TL",
        "coeff_HTS1_HOME_TOTAL_7_TG", "coeff_HTS1_HOME_TOTAL_8_T", "coeff_HTS1_HOME_TOTAL_8_TL",
        "coeff_HTS1_HOME_TOTAL_8_TG", "coeff_HTS1_HOME_TOTAL_9_T", "coeff_HTS1_HOME_TOTAL_9_TL",
        "coeff_HTS1_HOME_TOTAL_9_TG"
    ], "bases": [
        "coeff_HTS1_HOME_TOTAL_0_T", "coeff_HTS1_HOME_T", "coeff_HTS1_HOME_TOTAL_1_T",
        "coeff_HTS1_HOME_TOTAL_2_T", "coeff_HTS1_HOME_TOTAL_3_T", "coeff_HTS1_HOME_TOTAL_4_T",
        "coeff_HTS1_HOME_TOTAL_5_T", "coeff_HTS1_HOME_TOTAL_6_T", "coeff_HTS1_HOME_TOTAL_7_T",
        "coeff_HTS1_HOME_TOTAL_8_T", "coeff_HTS1_HOME_TOTAL_9_T"
    ], "odd": []
    },
    {
        "name": t('markets.totals.points_part_', {team: '{A}', part: 1}), "sports": [
        "volleyball"
    ], "template": "total", "id": 153, "group_id": 10, "dependencies": [
        "coeff_HTS1_AWAY_TOTAL_0_T", "coeff_HTS1_AWAY_TOTAL_0_TL", "coeff_HTS1_AWAY_TOTAL_0_TG",
        "coeff_HTS1_AWAY_T",
        "coeff_HTS1_AWAY_TL", "coeff_HTS1_AWAY_TG", "coeff_HTS1_AWAY_TOTAL_1_T", "coeff_HTS1_AWAY_TOTAL_1_TL",
        "coeff_HTS1_AWAY_TOTAL_1_TG", "coeff_HTS1_AWAY_TOTAL_2_T", "coeff_HTS1_AWAY_TOTAL_2_TL",
        "coeff_HTS1_AWAY_TOTAL_2_TG", "coeff_HTS1_AWAY_TOTAL_3_T", "coeff_HTS1_AWAY_TOTAL_3_TL",
        "coeff_HTS1_AWAY_TOTAL_3_TG", "coeff_HTS1_AWAY_TOTAL_4_T", "coeff_HTS1_AWAY_TOTAL_4_TL",
        "coeff_HTS1_AWAY_TOTAL_4_TG", "coeff_HTS1_AWAY_TOTAL_5_T", "coeff_HTS1_AWAY_TOTAL_5_TL",
        "coeff_HTS1_AWAY_TOTAL_5_TG", "coeff_HTS1_AWAY_TOTAL_6_T", "coeff_HTS1_AWAY_TOTAL_6_TL",
        "coeff_HTS1_AWAY_TOTAL_6_TG", "coeff_HTS1_AWAY_TOTAL_7_T", "coeff_HTS1_AWAY_TOTAL_7_TL",
        "coeff_HTS1_AWAY_TOTAL_7_TG", "coeff_HTS1_AWAY_TOTAL_8_T", "coeff_HTS1_AWAY_TOTAL_8_TL",
        "coeff_HTS1_AWAY_TOTAL_8_TG", "coeff_HTS1_AWAY_TOTAL_9_T", "coeff_HTS1_AWAY_TOTAL_9_TL",
        "coeff_HTS1_AWAY_TOTAL_9_TG"
    ], "bases": [
        "coeff_HTS1_AWAY_TOTAL_0_T", "coeff_HTS1_AWAY_T", "coeff_HTS1_AWAY_TOTAL_1_T",
        "coeff_HTS1_AWAY_TOTAL_2_T", "coeff_HTS1_AWAY_TOTAL_3_T", "coeff_HTS1_AWAY_TOTAL_4_T",
        "coeff_HTS1_AWAY_TOTAL_5_T", "coeff_HTS1_AWAY_TOTAL_6_T", "coeff_HTS1_AWAY_TOTAL_7_T",
        "coeff_HTS1_AWAY_TOTAL_8_T", "coeff_HTS1_AWAY_TOTAL_9_T"
    ], "odd": []
    },
    {
        "name": {
            "default": t('markets.outcomes.set', {part: 2}),
            "volleyball": t('markets.outcomes.part', {part: 2}),
            "beach_volleyball": t('markets.outcomes.part', {part: 2})
        }, "sports": [
        "volleyball", "beach_volleyball", "tennis", "table_tennis", "badminton"
    ], "template": "simple_list", "rows": [
        {"title": t('markets.home_victory'), "name": "coeff_HTSCW2_P1"},
        {"title": t('markets.away_victory'), "name": "coeff_HTSCW2_P2"}
    ], "id": 154, "group_id": 10, "dependencies": ["coeff_HTSCW2_P1", "coeff_HTSCW2_P2"]
    },
    {
        "name": {
            "default": t('markets.totals.games_', {part: 2}),
            "volleyball": t('markets.totals.goals_part', {part: 2}),
            "table_tennis": t('markets.totals.goals_part', {part: 2}),
            "beach_volleyball": t('markets.totals.goals_part', {part: 2})
        }, "sports": [
        "volleyball", "beach_volleyball", "tennis", "table_tennis", "badminton"
    ], "template": "total", "id": 155, "group_id": 10, "dependencies": [
        "coeff_HTS2_TOTAL_0_T", "coeff_HTS2_TOTAL_0_TL", "coeff_HTS2_TOTAL_0_TG", "coeff_HTS2_TOTAL_1_T",
        "coeff_HTS2_TOTAL_1_TL", "coeff_HTS2_TOTAL_1_TG", "coeff_HTS2_T", "coeff_HTS2_TL", "coeff_HTS2_TG",
        "coeff_HTS2_TOTAL_2_T", "coeff_HTS2_TOTAL_2_TL", "coeff_HTS2_TOTAL_2_TG", "coeff_HTS2_TOTAL_3_T",
        "coeff_HTS2_TOTAL_3_TL", "coeff_HTS2_TOTAL_3_TG", "coeff_HTS2_TOTAL_4_T", "coeff_HTS2_TOTAL_4_TL",
        "coeff_HTS2_TOTAL_4_TG", "coeff_HTS2_TOTAL_5_T", "coeff_HTS2_TOTAL_5_TL", "coeff_HTS2_TOTAL_5_TG",
        "coeff_HTS2_TOTAL_6_T", "coeff_HTS2_TOTAL_6_TL", "coeff_HTS2_TOTAL_6_TG", "coeff_HTS2_TOTAL_7_T",
        "coeff_HTS2_TOTAL_7_TL", "coeff_HTS2_TOTAL_7_TG", "coeff_HTS2_TOTAL_8_T", "coeff_HTS2_TOTAL_8_TL",
        "coeff_HTS2_TOTAL_8_TG", "coeff_HTS2_TOTAL_9_T", "coeff_HTS2_TOTAL_9_TL", "coeff_HTS2_TOTAL_9_TG",
        "coeff_HTS2_Odd", "coeff_HTS2_Even"
    ], "bases": [
        "coeff_HTS2_TOTAL_0_T", "coeff_HTS2_TOTAL_1_T", "coeff_HTS2_T", "coeff_HTS2_TOTAL_2_T",
        "coeff_HTS2_TOTAL_3_T", "coeff_HTS2_TOTAL_4_T", "coeff_HTS2_TOTAL_5_T", "coeff_HTS2_TOTAL_6_T",
        "coeff_HTS2_TOTAL_7_T", "coeff_HTS2_TOTAL_8_T", "coeff_HTS2_TOTAL_9_T"
    ], "odd": "coeff_HTS2_"
    },
    {
        "name": t('markets.totals.points_part_', {team: '{H}', part: 2}), "sports": [
        "volleyball"
    ], "template": "total", "id": 156, "group_id": 10, "dependencies": [
        "coeff_HTS2_HOME_TOTAL_0_T", "coeff_HTS2_HOME_TOTAL_0_TL", "coeff_HTS2_HOME_TOTAL_0_TG",
        "coeff_HTS2_HOME_TOTAL_1_T", "coeff_HTS2_HOME_TOTAL_1_TL", "coeff_HTS2_HOME_TOTAL_1_TG",
        "coeff_HTS2_HOME_T", "coeff_HTS2_HOME_TL", "coeff_HTS2_HOME_TG", "coeff_HTS2_HOME_TOTAL_2_T",
        "coeff_HTS2_HOME_TOTAL_2_TL", "coeff_HTS2_HOME_TOTAL_2_TG", "coeff_HTS2_HOME_TOTAL_3_T",
        "coeff_HTS2_HOME_TOTAL_3_TL", "coeff_HTS2_HOME_TOTAL_3_TG", "coeff_HTS2_HOME_TOTAL_4_T",
        "coeff_HTS2_HOME_TOTAL_4_TL", "coeff_HTS2_HOME_TOTAL_4_TG", "coeff_HTS2_HOME_TOTAL_5_T",
        "coeff_HTS2_HOME_TOTAL_5_TL", "coeff_HTS2_HOME_TOTAL_5_TG", "coeff_HTS2_HOME_TOTAL_6_T",
        "coeff_HTS2_HOME_TOTAL_6_TL", "coeff_HTS2_HOME_TOTAL_6_TG", "coeff_HTS2_HOME_TOTAL_7_T",
        "coeff_HTS2_HOME_TOTAL_7_TL", "coeff_HTS2_HOME_TOTAL_7_TG", "coeff_HTS2_HOME_TOTAL_8_T",
        "coeff_HTS2_HOME_TOTAL_8_TL", "coeff_HTS2_HOME_TOTAL_8_TG", "coeff_HTS2_HOME_TOTAL_9_T",
        "coeff_HTS2_HOME_TOTAL_9_TL", "coeff_HTS2_HOME_TOTAL_9_TG"
    ], "bases": [
        "coeff_HTS2_HOME_TOTAL_0_T", "coeff_HTS2_HOME_TOTAL_1_T", "coeff_HTS2_HOME_T",
        "coeff_HTS2_HOME_TOTAL_2_T", "coeff_HTS2_HOME_TOTAL_3_T", "coeff_HTS2_HOME_TOTAL_4_T",
        "coeff_HTS2_HOME_TOTAL_5_T", "coeff_HTS2_HOME_TOTAL_6_T", "coeff_HTS2_HOME_TOTAL_7_T",
        "coeff_HTS2_HOME_TOTAL_8_T", "coeff_HTS2_HOME_TOTAL_9_T"
    ], "odd": []
    },
    {
        "name": t('markets.totals.points_part_', {team: '{A}', part: 2}), "sports": [
        "volleyball"
    ], "template": "total", "id": 157, "group_id": 10, "dependencies": [
        "coeff_HTS2_AWAY_TOTAL_0_T", "coeff_HTS2_AWAY_TOTAL_0_TL", "coeff_HTS2_AWAY_TOTAL_0_TG",
        "coeff_HTS2_AWAY_TOTAL_1_T", "coeff_HTS2_AWAY_TOTAL_1_TL", "coeff_HTS2_AWAY_TOTAL_1_TG",
        "coeff_HTS2_AWAY_T", "coeff_HTS2_AWAY_TL", "coeff_HTS2_AWAY_TG", "coeff_HTS2_AWAY_TOTAL_2_T",
        "coeff_HTS2_AWAY_TOTAL_2_TL", "coeff_HTS2_AWAY_TOTAL_2_TG", "coeff_HTS2_AWAY_TOTAL_3_T",
        "coeff_HTS2_AWAY_TOTAL_3_TL", "coeff_HTS2_AWAY_TOTAL_3_TG", "coeff_HTS2_AWAY_TOTAL_4_T",
        "coeff_HTS2_AWAY_TOTAL_4_TL", "coeff_HTS2_AWAY_TOTAL_4_TG", "coeff_HTS2_AWAY_TOTAL_5_T",
        "coeff_HTS2_AWAY_TOTAL_5_TL", "coeff_HTS2_AWAY_TOTAL_5_TG", "coeff_HTS2_AWAY_TOTAL_6_T",
        "coeff_HTS2_AWAY_TOTAL_6_TL", "coeff_HTS2_AWAY_TOTAL_6_TG", "coeff_HTS2_AWAY_TOTAL_7_T",
        "coeff_HTS2_AWAY_TOTAL_7_TL", "coeff_HTS2_AWAY_TOTAL_7_TG", "coeff_HTS2_AWAY_TOTAL_8_T",
        "coeff_HTS2_AWAY_TOTAL_8_TL", "coeff_HTS2_AWAY_TOTAL_8_TG", "coeff_HTS2_AWAY_TOTAL_9_T",
        "coeff_HTS2_AWAY_TOTAL_9_TL", "coeff_HTS2_AWAY_TOTAL_9_TG"
    ], "bases": [
        "coeff_HTS2_AWAY_TOTAL_0_T", "coeff_HTS2_AWAY_TOTAL_1_T", "coeff_HTS2_AWAY_T",
        "coeff_HTS2_AWAY_TOTAL_2_T", "coeff_HTS2_AWAY_TOTAL_3_T", "coeff_HTS2_AWAY_TOTAL_4_T",
        "coeff_HTS2_AWAY_TOTAL_5_T", "coeff_HTS2_AWAY_TOTAL_6_T", "coeff_HTS2_AWAY_TOTAL_7_T",
        "coeff_HTS2_AWAY_TOTAL_8_T", "coeff_HTS2_AWAY_TOTAL_9_T"
    ], "odd": []
    },
    {
        "name": {
            "default": t('markets.outcomes.set', {part: 3}),
            "volleyball": t('markets.outcomes.part', {part: 3}),
            "beach_volleyball": t('markets.outcomes.part', {part: 3})
        }, "sports": [
        "volleyball", "beach_volleyball", "tennis", "table_tennis", "badminton"
    ], "template": "simple_list", "rows": [
        {"title": t('markets.home_victory'), "name": "coeff_HTSCW3_P1"},
        {"title": t('markets.away_victory'), "name": "coeff_HTSCW3_P2"}
    ], "id": 158, "group_id": 10, "dependencies": ["coeff_HTSCW3_P1", "coeff_HTSCW3_P2"]
    },
    {
        "name": {
            "default": t('markets.totals.games_', {part: 3}),
            "volleyball": t('markets.totals.goals_part', {part: 3}),
            "table_tennis": t('markets.totals.goals_part', {part: 3}),
            "beach_volleyball": t('markets.totals.goals_part', {part: 3})
        }, "sports": [
        "volleyball", "beach_volleyball", "tennis", "table_tennis", "badminton"
    ], "template": "total", "id": 159, "group_id": 10, "dependencies": [
        "coeff_HTS3_TOTAL_0_T", "coeff_HTS3_TOTAL_0_TL", "coeff_HTS3_TOTAL_0_TG", "coeff_HTS3_TOTAL_1_T",
        "coeff_HTS3_TOTAL_1_TL", "coeff_HTS3_TOTAL_1_TG", "coeff_HTS3_TOTAL_2_T", "coeff_HTS3_TOTAL_2_TL",
        "coeff_HTS3_TOTAL_2_TG", "coeff_HTS3_T", "coeff_HTS3_TL", "coeff_HTS3_TG", "coeff_HTS3_TOTAL_3_T",
        "coeff_HTS3_TOTAL_3_TL", "coeff_HTS3_TOTAL_3_TG", "coeff_HTS3_TOTAL_4_T", "coeff_HTS3_TOTAL_4_TL",
        "coeff_HTS3_TOTAL_4_TG", "coeff_HTS3_TOTAL_5_T", "coeff_HTS3_TOTAL_5_TL", "coeff_HTS3_TOTAL_5_TG",
        "coeff_HTS3_TOTAL_6_T", "coeff_HTS3_TOTAL_6_TL", "coeff_HTS3_TOTAL_6_TG", "coeff_HTS3_TOTAL_7_T",
        "coeff_HTS3_TOTAL_7_TL", "coeff_HTS3_TOTAL_7_TG", "coeff_HTS3_TOTAL_8_T", "coeff_HTS3_TOTAL_8_TL",
        "coeff_HTS3_TOTAL_8_TG", "coeff_HTS3_TOTAL_9_T", "coeff_HTS3_TOTAL_9_TL", "coeff_HTS3_TOTAL_9_TG",
        "coeff_HTS3_Odd", "coeff_HTS3_Even"
    ], "bases": [
        "coeff_HTS3_TOTAL_0_T", "coeff_HTS3_TOTAL_1_T", "coeff_HTS3_TOTAL_2_T", "coeff_HTS3_T",
        "coeff_HTS3_TOTAL_3_T", "coeff_HTS3_TOTAL_4_T", "coeff_HTS3_TOTAL_5_T", "coeff_HTS3_TOTAL_6_T",
        "coeff_HTS3_TOTAL_7_T", "coeff_HTS3_TOTAL_8_T", "coeff_HTS3_TOTAL_9_T"
    ], "odd": "coeff_HTS3_"
    },
    {
        "name": t('markets.totals.points_part_', {team: '{H}', part: 3}), "sports": [
        "volleyball"
    ], "template": "total", "id": 160, "group_id": 10, "dependencies": [
        "coeff_HTS3_HOME_TOTAL_0_T", "coeff_HTS3_HOME_TOTAL_0_TL", "coeff_HTS3_HOME_TOTAL_0_TG",
        "coeff_HTS3_HOME_TOTAL_1_T", "coeff_HTS3_HOME_TOTAL_1_TL", "coeff_HTS3_HOME_TOTAL_1_TG",
        "coeff_HTS3_HOME_TOTAL_2_T", "coeff_HTS3_HOME_TOTAL_2_TL", "coeff_HTS3_HOME_TOTAL_2_TG",
        "coeff_HTS3_HOME_T", "coeff_HTS3_HOME_TL", "coeff_HTS3_HOME_TG", "coeff_HTS3_HOME_TOTAL_3_T",
        "coeff_HTS3_HOME_TOTAL_3_TL", "coeff_HTS3_HOME_TOTAL_3_TG", "coeff_HTS3_HOME_TOTAL_4_T",
        "coeff_HTS3_HOME_TOTAL_4_TL", "coeff_HTS3_HOME_TOTAL_4_TG", "coeff_HTS3_HOME_TOTAL_5_T",
        "coeff_HTS3_HOME_TOTAL_5_TL", "coeff_HTS3_HOME_TOTAL_5_TG", "coeff_HTS3_HOME_TOTAL_6_T",
        "coeff_HTS3_HOME_TOTAL_6_TL", "coeff_HTS3_HOME_TOTAL_6_TG", "coeff_HTS3_HOME_TOTAL_7_T",
        "coeff_HTS3_HOME_TOTAL_7_TL", "coeff_HTS3_HOME_TOTAL_7_TG", "coeff_HTS3_HOME_TOTAL_8_T",
        "coeff_HTS3_HOME_TOTAL_8_TL", "coeff_HTS3_HOME_TOTAL_8_TG", "coeff_HTS3_HOME_TOTAL_9_T",
        "coeff_HTS3_HOME_TOTAL_9_TL", "coeff_HTS3_HOME_TOTAL_9_TG"
    ], "bases": [
        "coeff_HTS3_HOME_TOTAL_0_T", "coeff_HTS3_HOME_TOTAL_1_T", "coeff_HTS3_HOME_TOTAL_2_T",
        "coeff_HTS3_HOME_T", "coeff_HTS3_HOME_TOTAL_3_T", "coeff_HTS3_HOME_TOTAL_4_T", "coeff_HTS3_HOME_TOTAL_5_T",
        "coeff_HTS3_HOME_TOTAL_6_T", "coeff_HTS3_HOME_TOTAL_7_T", "coeff_HTS3_HOME_TOTAL_8_T",
        "coeff_HTS3_HOME_TOTAL_9_T"
    ], "odd": []
    },
    {
        "name": t('markets.totals.points_part_', {team: '{A}', part: 3}), "sports": [
        "volleyball"
    ], "template": "total", "id": 161, "group_id": 10, "dependencies": [
        "coeff_HTS3_AWAY_TOTAL_0_T", "coeff_HTS3_AWAY_TOTAL_0_TL", "coeff_HTS3_AWAY_TOTAL_0_TG",
        "coeff_HTS3_AWAY_TOTAL_1_T", "coeff_HTS3_AWAY_TOTAL_1_TL", "coeff_HTS3_AWAY_TOTAL_1_TG",
        "coeff_HTS3_AWAY_TOTAL_2_T", "coeff_HTS3_AWAY_TOTAL_2_TL", "coeff_HTS3_AWAY_TOTAL_2_TG",
        "coeff_HTS3_AWAY_T", "coeff_HTS3_AWAY_TL", "coeff_HTS3_AWAY_TG", "coeff_HTS3_AWAY_TOTAL_3_T",
        "coeff_HTS3_AWAY_TOTAL_3_TL", "coeff_HTS3_AWAY_TOTAL_3_TG", "coeff_HTS3_AWAY_TOTAL_4_T",
        "coeff_HTS3_AWAY_TOTAL_4_TL", "coeff_HTS3_AWAY_TOTAL_4_TG", "coeff_HTS3_AWAY_TOTAL_5_T",
        "coeff_HTS3_AWAY_TOTAL_5_TL", "coeff_HTS3_AWAY_TOTAL_5_TG", "coeff_HTS3_AWAY_TOTAL_6_T",
        "coeff_HTS3_AWAY_TOTAL_6_TL", "coeff_HTS3_AWAY_TOTAL_6_TG", "coeff_HTS3_AWAY_TOTAL_7_T",
        "coeff_HTS3_AWAY_TOTAL_7_TL", "coeff_HTS3_AWAY_TOTAL_7_TG", "coeff_HTS3_AWAY_TOTAL_8_T",
        "coeff_HTS3_AWAY_TOTAL_8_TL", "coeff_HTS3_AWAY_TOTAL_8_TG", "coeff_HTS3_AWAY_TOTAL_9_T",
        "coeff_HTS3_AWAY_TOTAL_9_TL", "coeff_HTS3_AWAY_TOTAL_9_TG"
    ], "bases": [
        "coeff_HTS3_AWAY_TOTAL_0_T", "coeff_HTS3_AWAY_TOTAL_1_T", "coeff_HTS3_AWAY_TOTAL_2_T",
        "coeff_HTS3_AWAY_T", "coeff_HTS3_AWAY_TOTAL_3_T", "coeff_HTS3_AWAY_TOTAL_4_T", "coeff_HTS3_AWAY_TOTAL_5_T",
        "coeff_HTS3_AWAY_TOTAL_6_T", "coeff_HTS3_AWAY_TOTAL_7_T", "coeff_HTS3_AWAY_TOTAL_8_T",
        "coeff_HTS3_AWAY_TOTAL_9_T"
    ], "odd": []
    },
    {
        "name": t('markets.removal'), "template": "yes_no_list", "sports": [
        "soccer", "hockey", "ball_hockey", "olympic_games"
    ], "rows": [
        {"title": t('markets.removal_will'), "name": "coeff_REMOVAL_"}
    ], "id": 162, "group_id": 6, "dependencies": ["coeff_REMOVAL_YES", "coeff_REMOVAL_NO"]
    },
    {
        "name": t('markets.penalty'), "template": "yes_no_list", "sports": [
        "soccer", "hockey", "ball_hockey", "olympic_games"
    ], "rows": [
        {"title": t('markets.penalty_will'), "name": "coeff_PENALTY_"}
    ], "id": 163, "group_id": 6, "dependencies": ["coeff_PENALTY_YES", "coeff_PENALTY_NO"]
    },
    {
        "name": "mainline",
        "template": "mainline",
        "columns": [
            {"title": "1", "name": "coeff_FT_1"},
            {"title": "1", "name": "coeff_CW_P1"},
            {"title": "X", "name": "coeff_FT_X"},
            {"title": "2", "name": "coeff_FT_2"},
            {"title": "2", "name": "coeff_CW_P2"},
            {"title": "1X", "name": "coeff_DCFT_1X"},
            {"title": "12", "name": "coeff_DCFT_12"},
            {"title": "X2", "name": "coeff_DCFT_X2"},
            {"title": t('coeffs.fora.1'), "name": "coeff_ODDS_FT_0ODDS_H", "base": "coeff_ODDS_FT_0ODDS"},
            {"title": t('coeffs.fora.2'), "name": "coeff_ODDS_FT_0ODDS_A", "base": "coeff_ODDS_FT_0ODDS"},
            {"title": t('coeffs.total.tl'), "name": "coeff_FT_TL", "base": "coeff_FT_T"},
            {"title": t('coeffs.total.tg'), "name": "coeff_FT_TG", "base": "coeff_FT_T"}
        ], "id": 164,
        "group_id": 11,
        "dependencies": [
            'coeff_FT_1',
            'coeff_FT_X',
            'coeff_FT_2',
            'coeff_CW_P1', // * для тенниса 1
            'coeff_CW_P2', // * для тенниса 2
            'coeff_DCFT_1X',
            'coeff_DCFT_12',
            'coeff_DCFT_X2',
            'coeff_ODDS_FT_0ODDS_H',
            'coeff_ODDS_FT_0ODDS_A',
            'coeff_ODDS_FT_0ODDS',
            'coeff_FT_TL',
            'coeff_FT_TG',
            'coeff_FT_T'
        ]
    }
]

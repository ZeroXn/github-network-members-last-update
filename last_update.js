// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://github.com/*/network/members
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

function repo_date()
{
    var repos = jQuery('div.repository-content').find('div#network').find('div.repo');
    var cur_repo = jQuery(repos[0]).text().replace(/(\r\n|\n|\r|\s)/gm,"");
    console.log(cur_repo);
    ///*
    repos.each(
        function(index)
        {
            if (!jQuery(this).find('span.current-repository').length)
            {
                // console.log(jQuery(this).find('a'));
                var item = jQuery(this);
                var anchors = item.find('a');

                if (anchors.length > 1)
                {
                    // console.log(jQuery(anchors[0]).attr('href'));
                    jQuery.get(
                        jQuery(anchors[0]).attr('href'),
                        'tab=repositories',
                        function(data)
                        {
                            jQuery(data).find('ul.repo-list').find('li.repo-list-item.public.fork').each(
                                function()
                                {
                                    var repo_info = jQuery(this).find('p.repo-list-info');
                                    var repo_meta = jQuery(this).find('p.repo-list-meta');
                                    
                                    if (repo_info.length > 0)
                                    {
                                        if (jQuery(repo_info[0]).text().toLowerCase().indexOf(cur_repo) > -1)
                                        {
                                            // console.log(jQuery(repo_info[0]).text().trim());
                                            // console.log(jQuery(repo_meta[0]).text().trim());
                                            jQuery(item[0]).append('<span>' + jQuery(repo_meta[0]).text().trim() + '</span>');
                                        }
                                    }
                                    
                                }
                            );
                        }
                    );
                }
            }
        }
    );
    //*/
}
repo_date()

Javascript Questions:

For these questions, we are only looking for basic programming literacy and error handling, and not an over-engineered solution with major design work.

Open manage_list.html in Internet Explorer, Chrome, Firefox, or Safari.

1)  The "[delete]" link looks ugly (or at least most of us think so).  Change it to use a button.
2)  Change the "Add list item" button so that it prompts the user for a name, and then adds it to the list.

NOTE: if you see an "Internet Explorer restricted this webpage from running scripts or ActiveX controls" message, please click "Allow blocked content".


### Solution
1.
  - Changed the ListView render to output `<button>` instead of `<span>`
  - Changed hook/callback/event to monitor `click button.delete` instead of `click span.delete`
2.
  - When clicking on 'Add list item', JS prompt will popup prompting for for first name.
  - Added an "Allow multiple first names" checkbox for if is necessary to allow for a first name to include multiple names (ex: Sarah Michelle Gellar).
  - Empty strings and null are not accepted as input for the list; such inputs will not be added.

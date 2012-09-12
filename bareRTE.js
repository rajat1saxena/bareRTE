/*
* <Plugin name>
* <Short description of functionalities of the plugin>
* 
* Copywrite (c) <Year> <Your name>(<Your email>)
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
*/
/*
* Note: replace 'PLUGIN_NAME' with the name of your plugin
*/
(function($){
	$.fn.bareRTE = function(options){
		$.fn.bareRTE.defaults = { BUTTONSCLASS : 'bare-btn',TOOLBARCLASS : 'bare-tlbr',HEIGHT : 200,WIDTH: 200,FRMCLS: 'dummy_class'}
		var opts = $.extend({},$.fn.bareRTE.defaults,options);
		return this.each(function(){

			/*plugin code starts here*/
			var target = $(this)[0];
			var textoftarget = $(this).text();
			if(target.type=="textarea"){
				//console.log("Yes I am a textarea");
				/* let's continue */
				/* creating an iframe */
				var targetFrame = document.createElement('iframe');
				targetFrame.setAttribute('class','editorFrame '+opts.FRMCLS);
				targetFrame.src = 'about:blank';

				/* creating an outer div to wrap everything */
				var parentDiv = document.createElement('div');
				parentDiv.setAttribute('class','bareRTEditor');

				/* creating buttons */
				var bold_button = document.createElement('button');
				var italic_button = document.createElement('button');
				var underline_button = document.createElement('button');

				/* setting properties of buttons */
				bold_button.setAttribute('class','bold_button');
				italic_button.setAttribute('class','italic_button');
				underline_button.setAttribute('class','underline_button');

				/* adding text to buttons */
				bold_button_text=document.createTextNode('Bold');
				italic_button_text=document.createTextNode('Italic');
				underline_button_text=document.createTextNode('UnderLine');
				bold_button.appendChild(bold_button_text);
				italic_button.appendChild(italic_button_text);
				underline_button.appendChild(underline_button_text);

				/* creating toolbar */
				var toolbar = document.createElement('div');
				toolbar.setAttribute('class','editorToolbar');

				/* adding buttons to editor */
				toolbar.appendChild(bold_button);
				toolbar.appendChild(italic_button);
				toolbar.appendChild(underline_button);

				/* adding toolbar to editor */
				parentDiv.appendChild(toolbar)

				/* setting designmode on */
				targetFrame.style.height=opts.HEIGHT;
				targetFrame.style.width=opts.WIDTH;
				parentDiv.appendChild(targetFrame);
				$(this).replaceWith(parentDiv);
				targetFrame.contentDocument.designMode='On';

				// setting content
				targetFrame.contentWindow.document.open('text/html','replace');
				targetFrame.contentWindow.document.write(textoftarget);
				targetFrame.contentWindow.document.close();

				/* adding textarea after parentDiv */
				$(target).css('display','none');
				$(parentDiv).after(target);
				
				/* click events of buttons */
				$('button.bold_button').click(function(){
					/* getting iframe */
					var boldiframe = $(parentDiv).find('iframe')[0];
					console.log(boldiframe);
				    boldiframe.contentDocument.execCommand('bold',false,null);
				    var targetFrame=$(parentDiv).find('iframe.editorFrame');
					console.log(targetFrame);
					var textofiframe=targetFrame[0].contentWindow.document.body.innerHTML;
					console.log(textofiframe);
					$(target).text(textofiframe);
				});
				$('button.italic_button').click(function(){
				    /* getting iframe */
					var italiciframe = $(parentDiv).find('iframe')[0]
				    italiciframe.contentDocument.execCommand('italic',false,null);
				    var targetFrame=$(parentDiv).find('iframe.editorFrame');
					console.log(targetFrame);
					var textofiframe=targetFrame[0].contentWindow.document.body.innerHTML;
					console.log(textofiframe);
					$(target).text(textofiframe);
				});
				$('button.underline_button').click(function(){
				    /* getting iframe */
					var underlineiframe = $(parentDiv).find('iframe')[0]
				    underlineiframe.contentDocument.execCommand('underline',false,null);
				    var targetFrame=$(parentDiv).find('iframe.editorFrame');
					console.log(targetFrame);
					var textofiframe=targetFrame[0].contentWindow.document.body.innerHTML;
					console.log(textofiframe);
					$(target).text(textofiframe);
				});

				/* copying content to textarea */
				console.log($(parentDiv).find('iframe.editorFrame'),target);
				$($(parentDiv).find('iframe.editorFrame')).contents().keypress(function(e){
					var targetFrame=$(parentDiv).find('iframe.editorFrame');
					console.log(targetFrame);
					var textofiframe=targetFrame[0].contentWindow.document.body.innerHTML;
					console.log(textofiframe);
					$(target).text(textofiframe);
					return true;
				});

			}else{
				console.log("I am not a textarea");
			}
			/*plugin code ends here*/

		});
	}
})(jQuery);
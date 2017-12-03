function updateButtons( element ) {
  var form = element.form;

  if ( element.type == 'checkbox' && element.checked ) {
    form.elements['executeButton'].disabled = false;
  } else {
    var canExecute = false;
    if ( form.elements['filter[AutoArchive]'] && form.elements['filter[AutoArchive]'].checked )
      canExecute = true;
    else if ( form.elements['filter[AutoVideo]'] && form.elements['filter[AutoVideo]'].checked )
      canExecute = true;
    else if ( form.elements['filter[AutoUpload]'] && form.elements['filter[AutoUpload]'].checked )
      canExecute = true;
    else if ( form.elements['filter[AutoEmail]'] && form.elements['filter[AutoEmail]'].checked )
      canExecute = true;
    else if ( form.elements['filter[AutoMessage]'] && form.elements['filter[AutoMessage]'].checked )
      canExecute = true;
    else if ( form.elements['filter[AutoExecute]'].checked && form.elements['filter[AutoExecuteCmd]'].value != '' )
      canExecute = true;
    else if ( form.elements['filter[AutoDelete]'].checked )
      canExecute = true;
    else if ( form.elements['filter[UpdateDiskSpace]'].checked )
      canExecute = true;
    form.elements['executeButton'].disabled = !canExecute;
  }
  if ( form.elements['filter[Name]'].value ) {
    form.elements['Save'].disabled = false;
    form.elements['SaveAs'].disabled = false;
  } else {
    form.elements['Save'].disabled = true;
    form.elements['SaveAs'].disabled = true;
  }
}

function clearValue( element, line ) {
  var form = element.form;
  var val = form.elements['filter[Query][terms]['+line+'][val]'];
  val.value = '';
}

function submitToFilter( element ) {
  var form = element.form;
  form.target = window.name;
  form.action = thisUrl + '?view=filter';
  form.elements['action'].value = 'submit';
  form.submit();
}

function submitToEvents( element ) {
  var form = element.form;
  if ( validateForm( form ) ) {
    form.action = thisUrl + '?view=events';
    form.submit();
  }
}

function executeFilter( element ) {
  var form = element.form;
  if ( validateForm( form ) ) {
    form.action = thisUrl + '?view=events';
    form.elements['action'].value = 'execute';
    form.submit();
  }
}

function saveFilter( element ) {
  var form = element.form;
  form.target = window.name;
  form.elements['action'].value = element.value;
  form.action = thisUrl + '?view=filter';
  form.submit();
}

function deleteFilter( element, name ) {
  if ( confirm( deleteSavedFilterString+" '"+name+"'?" ) ) {
    var form = element.form;
    form.elements['action'].value = 'delete';
    form.submit();
  }
}

function addTerm( element, line ) {
  var form = element.form;
  form.target = window.name;
  form.action = thisUrl + '?view='+currentView;
  form.elements['object'].value = 'filter';
  form.elements['action'].value = 'addterm';
  form.elements['line'].value = line;
  form.submit();
}

function delTerm( element, line ) {
  var form = element.form;
  form.target = window.name;
  form.action = thisUrl + '?view='+currentView;
  form.elements['object'].value = 'filter';
  form.elements['action'].value = 'delterm';
  form.elements['line'].value = line;
  form.submit();
}

function init() {
  updateButtons( $('executeButton') );
}

window.addEvent( 'domready', init );

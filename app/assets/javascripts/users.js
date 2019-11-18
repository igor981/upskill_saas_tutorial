/* global $, Stripe  */
//Document ready     
$(document).on('turbolinks:load', function(){
    var theForm = $('#pro_form');
    var submitBtn = $('#form-submit-btn');
    
    // set stripe public key
    Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
    
    
    //When user click form submit button
    submitBtn.click(function(event){
       // we will prevent the default submission behavior
        event.preventDefault();
        submitBtn.val("Processing").prop('disabled', true);
        
        // Collect creditcard fields.
        var ccNum = $('#card_number').val(),
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();
       // Use stripe js library to check for card errors.
       
       var error = false;
       
       //Validate card numbers
       if(!Stripe.card.validateCardNumber(ccNum)) {
            error = true;
            alert('The credit card number appears to be invalid');
       }
       
       //Validate cvc number
       if(!Stripe.card.validateCVC(cvcNum)) {
            error = true;
            alert('The cvc number appears to be invalid');
       }
       //Validate card expiration date
       if(!Stripe.card.validateExpiry(expMonth, expYear)) {
            error = true;
            alert('The expirations date  appears to be invalid');
       }
       if (error) {
           //If there are card errors dont send to stripe   
           submitBtn.prop('disabled', false).val("Sign Up");
       } else {
           // Send the cardinfo to stripe
        
            Stripe.createToken({
                number: ccNum,
                cvc: cvcNum,
                exp_month: expMonth,
                exp_year: expYear
        }, stripeResponseHandler);
        
       }
        
        return false;
    });
    
    
    // Stripe will return back with a card token
    function stripeResponseHandler(status, response) {
        // Get the token from the response.
        var token = response.id;
        
        // Inject the cardtoken in a hidden field.
        theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
        
        // Submit form to our rails app.
        theForm.get(0).submit();
    }
});

/* global $, Stripe  */
//Document ready     
$(document).on('turbolinks:load', function(){
    var theForm = $('#pro_form');
    var submitBtn = $('#form-submit-btn');
    
    // set stripe public key
    Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') )
    
    
    //When user click form submit button
    submitBtn.click(function(event){
       // we will prevent the default submission behavior
        event.preventDefault();
        // Collect creditcard fields.
        var ccNum = $('#card_number').val(),
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();
        // Send the cardinfo to stripe
        Stripe.createToken({
            number: ccNum,
            cvc: cvcNum,
            exp_month: expMonth,
            exp_year: expYear
        }, stripeResponseHandler);
    });
    
    
    // Stripe will return back with a card token
    // Handle that response
    // Inject card token as hideen field into form.
    // subimt form to our rails app
});

$(document).ready(function() {
    var options = {
        valueNames: ['id', 'name', 'price', 'description']
    };

    // Init list
    var contactList = new List('contacts', options);

    var idField = $('#id-field'),
        nameField = $('#name-field'),
        priceField = $('#price-field'),
        descriptionField = $('#description-field'),
        addBtn = $('#add-btn'),
        editBtn = $('#edit-btn').hide(),
        removeBtns = $('.remove-item-btn'),
        editBtns = $('.edit-item-btn');

    // Sets callbacks to the buttons in the list
    refreshCallbacks();

    addBtn.click(function() {
        if (nameField.val() !== "") {
            contactList.add({
                id: Math.floor(Math.random() * 110000),
                name: nameField.val(),
                price: priceField.val(),
                description: descriptionField.val()
            });
            clearFields();
            refreshCallbacks();
            console.log(contactList);
        }
    });

    editBtn.click(function() {
        var item = contactList.get('id', idField.val())[0];
        item.values({
            id: idField.val(),
            name: nameField.val(),
            price: priceField.val(),
            description: descriptionField.val()
        });
        clearFields();
        editBtn.hide();
        addBtn.show();
    });

    function refreshCallbacks() {
        // Needed to add new buttons to jQuery-extended object
        removeBtns = $(removeBtns.selector);
        editBtns = $(editBtns.selector);

        removeBtns.click(function() {
            var itemId = $(this).closest('tr').find('.id').text();
            contactList.remove('id', itemId);
        });

        editBtns.click(function() {
            var itemId = $(this).closest('tr').find('.id').text();
            var itemValues = contactList.get('id', itemId)[0].values();
            idField.val(itemValues.id);
            nameField.val(itemValues.name);
            priceField.val(itemValues.price);
            descriptionField.val(itemValues.description);

            editBtn.show();
            addBtn.hide();
        });
    }

    function clearFields() {
        nameField.val('');
        priceField.val('');
        descriptionField.val('');
    }

});
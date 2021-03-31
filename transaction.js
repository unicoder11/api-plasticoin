transfer(payer, receiver, amount, memo) {
    
    amount = strapi.config.functions['wallet'].sanitizeAmount(amount);

    // Set up and sanitize transaction data

    const payer_data = {
      type: 'transfer',
      confirmed: false,
      user: payer,
      amount: strapi.config.functions['wallet'].convertToNegative(amount),
    }
    const valid_payer_data = await strapi.entityValidator.validateEntity(strapi.models.transaction, payer_data)

    const receiver_data = {
      type: 'transfer',
      confirmed: false,
      user: receiver,
      amount: amount,
    }
    const valid_receiver_data = await strapi.entityValidator.validateEntity(strapi.models.transaction, receiver_data)

    // Perform transactions
    const payer_transaction = await strapi.query('transaction').create(valid_payer_data);
    const receiver_transaction = await strapi.query('transaction').create(valid_receiver_data);

    return [payer_transaction.id, receiver_transaction.id]

  };

  transaction {
      String id,
      String payer_id,
      String receiver_id,
      int amount,
      String memo,


  };
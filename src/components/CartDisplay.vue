<template>
  <div class="cart__display" v-show="cartDisplay">
    <!-- To implement display of cart items logic -->
    <!-- To separate cart display from navbar -> create CartDisplay.vue component -->
    <div class="cart__items">
      <div class="cart__item">
        <img src="photoPath" alt="" class="item__img" />
        <div class="item__content">
          <p class="item__title card__title">
            {{ itemTitle }}
          </p>
          <div class="dev">
            <p class="item__price">
              {{ itemPrice }}
              <i class="item__quantity"
                >(x<i class="item__quantity">{{ quantityOfItemInCart }}</i
                >)
              </i>
            </p>
          </div>
          <i class="item__remove">X</i>
        </div>
      </div>
    </div>

    <p class="total__price">
      Total: <i>{{ cartTotal }}</i>
    </p>
    <button class="cart__button">Finalizeaza comanda</button>
  </div>
</template>

<script>
// to implement all logic
export default {};
</script>

<style></style>

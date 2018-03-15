jQuery(document).ready(function ($) {
    'use strict';

    /**
     *  Application Init
     *  Init Application widgets and components.
     */

    Application.init({
        auth: function () {

            var $modalNode = $('[data-role="auth-modal"]');
            $('[data-auth-action]').on('click', function (e) {
                e.preventDefault();
                var $this = $(this),
                    targetID = $this.data('auth-action');

                $modalNode.find('.modal-content').empty().html($(targetID).html());
                $modalNode.modal('show')
            });
        },
        calculator: function () {
            var $customersNode = $('[data-calc="customers"]');
            var $sumNode = $('[data-calc="sum"]');
            var $totalNode = $('[data-calc="total"]');
            var $incrementNode = $('[data-action="inc"]');
            var $decrementNode = $('[data-action="dec"]');

            $customersNode.html(getFormattedNum($customersNode.html()));
            $sumNode.html(getFormattedNum($sumNode.html()));
            $totalNode.html(getFormattedNum($totalNode.html()));
            updateIncrement($incrementNode);
            updateDecrement($decrementNode);
            updateTotal();

            $incrementNode.on('click', function (e) {
                e.preventDefault();
                var $this = $(this),
                    step = Number($this.data('step')),
                    $target = $('[data-calc="' + $this.data('target') + '"]'),
                    value = Number($target.html().replace(/\s/g, '')) + step;

                $target.html(getFormattedNum(value));
                updateIncrement($this);
                updateDecrement($decrementNode);
                updateTotal();
            });

            $decrementNode.on('click', function (e) {
                e.preventDefault();
                var $this = $(this),
                    step = Number($this.data('step')),
                    $target = $('[data-calc="' + $this.data('target') + '"]'),
                    value = Number($target.html().replace(/\s/g, '')) - step;

                $target.html(getFormattedNum(value));
                updateIncrement($incrementNode);
                updateDecrement($this);
                updateTotal();
            });

            function updateIncrement($els) {
                $els.map(function (i, el, arr) {
                    var $el = $(el),
                        $target = $('[data-calc="' + $el.data('target') + '"]'),
                        max = Number($target.data('max')),
                        step = Number($el.data('step')),
                        value = Number($target.html().replace(/\s/g, '')) + step;

                    max && $el.attr('disabled', value > max)
                });
            }

            function updateDecrement($els) {
                $els.map(function (i, el, arr) {
                    var $el = $(el),
                        $target = $('[data-calc="' + $el.data('target') + '"]'),
                        min = Number($target.data('min')) || 0,
                        step = Number($el.data('step')),
                        value = Number($target.html().replace(/\s/g, '')) - step;

                    $el.attr('disabled', value < min)
                });
            }

            function updateTotal() {
                var customersVal = Number($customersNode.html().replace(/\s/g, '')),
                    sumVal = Number($sumNode.html().replace(/\s/g, '')),
                    val = customersVal * sumVal / 3,
                    formattedVal = val.toFixed();

                $totalNode.html(getFormattedNum(formattedVal));
            }

            function getFormattedNum(num) {
                var stringedNum = String(num);
                var result = [];
                for (var k = stringedNum.length - 1, step = 1; k >= 0; k--, step++) {
                    if (step === 3) {
                        result.unshift(' ' + stringedNum[k]);
                        step = 0;
                    } else {
                        result.unshift(stringedNum[k]);
                    }
                }

                return result.join('').trim();
            }
        },
        scrollToTop: function () {
            $('[data-action="scrollToTop"]').on('click', function (e) {
                e.preventDefault();

                $("html, body").animate({scrollTop: 0}, "slow");
            })
        }
    })
});
